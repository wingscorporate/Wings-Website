import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';

const PORT = 3000;
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1s9oMgn_zTWryP0n34z-FMKHg-dktQR6Nm-ZSO97AMVY';

const LEADS_FILE = path.join(process.cwd(), 'leads.json');

function sanitizeInput(val: unknown, maxLength = 300): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()
    .slice(0, maxLength);
}

// Simple IP rate limiter to protect public endpoints from spam (max 15 requests/min per IP)
const ipRateLimits = new Map<string, { count: number; resetTime: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const clientIp = ip || 'unknown';
  const record = ipRateLimits.get(clientIp) || { count: 0, resetTime: now + 60000 };
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + 60000;
  } else {
    record.count += 1;
  }
  ipRateLimits.set(clientIp, record);
  return record.count > 15;
}

// In-memory duplicate prevention map (email + phone -> timestamp)
const recentSubmissions = new Map<string, number>();

function isDuplicateSubmission(email: string, phone: string): boolean {
  if (!email && !phone) return false;
  const key = `${email.toLowerCase().trim()}:${phone.replace(/\D/g, '')}`;
  const now = Date.now();
  const lastTime = recentSubmissions.get(key);
  if (lastTime && now - lastTime < 30000) { // 30 seconds duplicate window
    return true;
  }
  recentSubmissions.set(key, now);
  // Cleanup old entries
  if (recentSubmissions.size > 500) {
    for (const [k, time] of recentSubmissions.entries()) {
      if (now - time > 60000) recentSubmissions.delete(k);
    }
  }
  return false;
}

// Ensure leads.json exists
function getStoredLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading leads file:', err);
  }
  return [];
}

function saveLeadLocally(leadData: any) {
  try {
    const leads = getStoredLeads();
    leads.push(leadData);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving lead locally:', err);
  }
}

// Initialize Google Auth with Service Account or keyFile
const CREDENTIALS_PATH = path.join(process.cwd(), 'google-credentials.json');

function getGoogleAuth() {
  const jsonEnv = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonEnv) {
    try {
      const rawJson = jsonEnv.trim();
      const credentials = JSON.parse(rawJson);
      if (credentials.private_key && typeof credentials.private_key === 'string') {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
      }
      console.log(`[Google Auth] Initializing Google Auth from GOOGLE_SERVICE_ACCOUNT_JSON (client_email: ${credentials.client_email}, project_id: ${credentials.project_id})`);
      return new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } catch (e: any) {
      console.error('[Google Auth] Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON environment variable:', e?.message || e);
    }
  }

  if (fs.existsSync(CREDENTIALS_PATH)) {
    console.log(`[Google Auth] Initializing Google Auth from local credentials file (${CREDENTIALS_PATH})`);
    return new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  console.warn('[Google Auth] No GOOGLE_SERVICE_ACCOUNT_JSON env or google-credentials.json file found. Falling back to default Google Auth.');
  return new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

let headersInitialized = false;

async function ensureSheetHeaders(sheetsInstance: any) {
  if (headersInitialized) return;
  try {
    const res = await sheetsInstance.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A1:Z1',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0 || rows[0].length === 0) {
      const headers = [
        'Timestamp',
        'Full Name',
        'Email Address',
        'Phone Number',
        'Brand / Website',
        'Monthly Ad Spend / Budget',
        'Requested Service',
        'Preferred Date',
        'Preferred Time',
        'Strategy Notes / Message',
        'Lead Source',
      ];
      await sheetsInstance.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
      console.log('Successfully added column headers to Google Sheet');
    }
    headersInitialized = true;
  } catch (err: any) {
    console.warn('Sheet header check note:', err?.message || err);
  }
}

async function appendToGoogleSheet(values: (string | number)[][]) {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    await ensureSheetHeaders(sheets);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });

    console.log('Successfully appended row to Google Sheet');
    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    const isApiNotEnabled = errorMsg.includes('has not been used in project') || errorMsg.includes('disabled');
    if (isApiNotEnabled) {
      console.warn('[Google Sheets Sync] Google Sheets API is disabled in GCP Cloud Console. Lead saved locally in leads.json.');
    } else {
      console.warn('[Google Sheets Sync] Could not sync row directly to Google Sheets:', errorMsg);
    }
    return {
      success: false,
      error: errorMsg,
    };
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50kb' }));

  // API Route: Book Your Free Strategy Call Submission
  app.post('/api/strategy-call', async (req, res) => {
    try {
      if (isRateLimited(req.ip || '')) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests. Please wait a minute before trying again.',
        });
      }

      const rawBody = req.body || {};
      const fullName = sanitizeInput(rawBody.fullName, 100);
      const email = sanitizeInput(rawBody.email, 150);
      const phone = sanitizeInput(rawBody.phone, 30);
      const brandName = sanitizeInput(rawBody.brandName, 100);
      const websiteUrl = sanitizeInput(rawBody.websiteUrl, 200);
      const monthlySpend = sanitizeInput(rawBody.monthlySpend, 50);
      const service = sanitizeInput(rawBody.service, 100);
      const preferredDate = sanitizeInput(rawBody.preferredDate, 30);
      const preferredTime = sanitizeInput(rawBody.preferredTime, 50);
      const notes = sanitizeInput(rawBody.notes, 500);

      // Server-side validation
      if (!fullName || !email || !phone) {
        return res.status(400).json({
          success: false,
          error: 'Please fill in all required fields: Full Name, Email, and Phone Number.',
        });
      }

      // Check for rapid duplicate submission
      if (isDuplicateSubmission(email, phone)) {
        return res.status(200).json({
          success: true,
          message: 'We have already received your request! A strategist will reach out to you shortly.',
          duplicate: true,
        });
      }

      const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium',
      });

      const leadId = `STRAT-${Date.now()}`;

      const leadRecord = {
        id: leadId,
        type: 'Strategy Call Form',
        timestamp,
        fullName,
        email,
        phone,
        brandName: brandName || websiteUrl,
        websiteUrl,
        monthlySpend,
        service,
        preferredDate,
        preferredTime,
        notes,
      };

      // 1. Always save lead locally
      saveLeadLocally(leadRecord);

      // 2. Format row for Google Sheets
      const row = [
        timestamp,
        fullName,
        email,
        phone,
        brandName || websiteUrl,
        monthlySpend,
        service,
        preferredDate,
        preferredTime,
        notes,
        'Strategy Call Form',
      ];

      // 3. Gracefully attempt Google Sheets append
      const sheetResult = await appendToGoogleSheet([row]);

      res.status(200).json({
        success: true,
        message: 'Strategy call request recorded successfully!',
        leadId,
        sheetSynced: sheetResult.success,
      });
    } catch (error: any) {
      console.error('Failed to submit strategy call lead:', error?.message || error);
      res.status(500).json({
        success: false,
        error: 'Unable to process your request at this time. Please try again.',
      });
    }
  });

  // API Route: General Contact Modal Submission
  app.post('/api/contact', async (req, res) => {
    try {
      if (isRateLimited(req.ip || '')) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests. Please wait a minute before trying again.',
        });
      }

      const rawBody = req.body || {};
      const name = sanitizeInput(rawBody.name, 100);
      const email = sanitizeInput(rawBody.email, 150);
      const phone = sanitizeInput(rawBody.phone, 30);
      const website = sanitizeInput(rawBody.website, 200);
      const budget = sanitizeInput(rawBody.budget, 50);
      const message = sanitizeInput(rawBody.message, 500);

      const rawServices = Array.isArray(rawBody.services) ? rawBody.services : [rawBody.services];
      const sanitizedServices = rawServices.map((s: any) => sanitizeInput(s, 50)).filter(Boolean);
      const servicesString = sanitizedServices.join(', ');

      // Server-side validation
      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          error: 'Please fill in all required fields: Name, Email, and Phone Number.',
        });
      }

      // Check for rapid duplicate submission
      if (isDuplicateSubmission(email, phone)) {
        return res.status(200).json({
          success: true,
          message: 'We have already received your message! Our team will get back to you shortly.',
          duplicate: true,
        });
      }

      const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium',
      });

      const leadId = `CONTACT-${Date.now()}`;

      const leadRecord = {
        id: leadId,
        type: 'Contact Modal Form',
        timestamp,
        name,
        email,
        phone,
        website,
        budget,
        services: servicesString,
        message,
      };

      // 1. Save lead locally
      saveLeadLocally(leadRecord);

      // 2. Format row for Google Sheets
      const row = [
        timestamp,
        name,
        email,
        phone,
        website,
        budget,
        servicesString,
        'N/A',
        'N/A',
        message,
        'Contact Modal Form',
      ];

      // 3. Gracefully attempt Google Sheets append
      const sheetResult = await appendToGoogleSheet([row]);

      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully!',
        leadId,
        sheetSynced: sheetResult.success,
      });
    } catch (error: any) {
      console.error('Failed to submit contact lead:', error?.message || error);
      res.status(500).json({
        success: false,
        error: 'Unable to process your request at this time. Please try again.',
      });
    }
  });

  // Admin API Route: Retrieve all captured leads
  app.get('/api/leads', (req, res) => {
    const leads = getStoredLeads();
    res.json({
      total: leads.length,
      spreadsheetId: SPREADSHEET_ID,
      leads,
    });
  });

  // Admin API Route: Export leads as CSV
  app.get('/api/leads/export-csv', (req, res) => {
    const leads = getStoredLeads();
    const headers = [
      'Timestamp',
      'Lead Type',
      'Name',
      'Email',
      'Phone',
      'Brand / Website',
      'Monthly Spend / Budget',
      'Services Required',
      'Preferred Date',
      'Preferred Time',
      'Notes / Message',
    ];

    const csvRows = [headers.join(',')];

    for (const lead of leads) {
      const values = [
        lead.timestamp || '',
        lead.type || '',
        lead.fullName || lead.name || '',
        lead.email || '',
        lead.phone || '',
        lead.brandName || lead.websiteUrl || lead.website || '',
        lead.monthlySpend || lead.budget || '',
        lead.service || lead.services || '',
        lead.preferredDate || '',
        lead.preferredTime || '',
        (lead.notes || lead.message || '').replace(/"/g, '""'),
      ].map((v) => `"${v}"`);

      csvRows.push(values.join(','));
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="wings_marketing_leads.csv"');
    res.status(200).send(csvRows.join('\n'));
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', spreadsheetId: SPREADSHEET_ID, totalLeads: getStoredLeads().length });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

