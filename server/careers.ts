import express from 'express';
import { createHash } from 'node:crypto';
import { CAREER_POSITIONS } from '../src/data/agencyData';

export const CAREERS_SPREADSHEET_ID = '1l2dZKRKQuczOR9nh0vc1WMtTshbgBFp3zyZoRZz_FSE';
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const FIELD_NAMES = [
  'fullName', 'email', 'mobile', 'whatsapp', 'cityState', 'experience', 'currentTitle',
  'currentCompany', 'currentCtc', 'expectedCtc', 'noticePeriod', 'qualification',
  'relevantSkills', 'portfolioUrl', 'linkedinUrl', 'githubUrl', 'webTechnologies',
  'webPlatformExperience', 'webProjects', 'bdSalesExperience', 'bdLeadGen', 'bdTargets',
  'metaAdsExperience', 'googleAdsExperience', 'monthlyBudgetManaged', 'trackingExperience',
  'optimizationExperience', 'coverLetter', 'joiningDate', 'heardFrom',
];

export class CareerValidationError extends Error {}

export function validateApplication(input: any) {
  const invalid = (message: string): never => { throw new CareerValidationError(message); };
  if (!input || typeof input !== 'object') invalid('Please provide an application.');
  if (typeof input.applicationId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.applicationId)) {
    invalid('Invalid application reference. Please reopen the form.');
  }
  const job = CAREER_POSITIONS.find((position) => position.id === input.jobId);
  if (!job) invalid('Please select an available position.');
  const fields: Record<string, string> = {};
  for (const key of FIELD_NAMES) {
    const value = input.fields?.[key];
    if (value !== undefined && typeof value !== 'string') invalid('Invalid application fields.');
    fields[key] = (value || '').trim();
    if (fields[key].length > 4000) invalid('Please keep each answer under 4,000 characters.');
  }
  for (const key of ['fullName', 'email', 'mobile', 'cityState', 'experience', 'noticePeriod', 'qualification', 'relevantSkills']) {
    if (!fields[key]) invalid('Please complete all required application fields.');
  }
  if (!/^\S+@\S+\.\S+$/.test(fields.email) || fields.email.length > 254) invalid('Enter a valid email address.');
  if (!/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(fields.mobile.replace(/[()]/g, ''))) invalid('Enter a valid Indian mobile number.');
  if (!['Fresher', '0–1 years', '1–2 years', '2–3 years', '3–5 years', '5+ years'].includes(fields.experience)) invalid('Select a valid work experience.');
  if (!['Immediately', '15 Days', '30 Days', '60 Days', '90 Days'].includes(fields.noticePeriod)) invalid('Select a valid notice period.');
  for (const key of ['portfolioUrl', 'linkedinUrl', 'githubUrl']) {
    if (!fields[key]) continue;
    try {
      if (!['http:', 'https:'].includes(new URL(fields[key]).protocol)) invalid('Use an HTTP or HTTPS portfolio/profile URL.');
    } catch { invalid('Enter a valid portfolio/profile URL.'); }
  }
  const roleFields = job.id === 'web-developer'
    ? ['webTechnologies', 'webPlatformExperience', 'webProjects']
    : job.department === 'Business Development'
      ? ['bdSalesExperience', 'bdLeadGen', 'bdTargets']
      : ['metaAdsExperience', 'googleAdsExperience', 'trackingExperience', 'optimizationExperience'];
  if (roleFields.some((key) => !fields[key])) invalid('Please answer all required role questions.');
  if (input.fields?.consent !== true) invalid('Consent is required to submit your application.');
  if (JSON.stringify(fields).length > 35000) invalid('Please shorten your application answers before submitting.');

  const file = input.resume;
  if (!file || typeof file.base64 !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(file.base64) || file.base64.length % 4 !== 0 || file.base64.length > Math.ceil(MAX_RESUME_BYTES / 3) * 4) {
    invalid('Upload a PDF, DOC, or DOCX resume up to 5 MB.');
  }
  const bytes = Buffer.from(file.base64, 'base64');
  const extension = typeof file.name === 'string' ? file.name.split('.').pop()?.toLowerCase() : '';
  const types = {
    pdf: ['application/pdf', Buffer.from('%PDF-')],
    doc: ['application/msword', Buffer.from('d0cf11e0a1b11ae1', 'hex')],
    docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', Buffer.from('504b0304', 'hex')],
  } as const;
  const kind = types[extension as keyof typeof types];
  if (!kind || file.type !== kind[0] || !bytes.subarray(0, kind[1].length).equals(kind[1]) || bytes.length === 0 || bytes.length > MAX_RESUME_BYTES || file.base64 !== bytes.toString('base64')) {
    invalid('Upload a valid PDF, DOC, or DOCX resume up to 5 MB.');
  }
  const payload = {
    applicationId: input.applicationId.toLowerCase(), jobId: job.id,
    jobRole: job.title, department: job.department,
    fields: { ...fields, consent: true } as Record<string, string | boolean>,
    resume: { name: `resume.${extension}`, type: kind[0], base64: bytes.toString('base64') },
  };
  const fingerprint = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  return { ...payload, fingerprint };
}

type Options = { fetch?: typeof fetch; env?: NodeJS.ProcessEnv; now?: () => number };

export function createCareersRouter(options: Options = {}) {
  const router = express.Router();
  const env = options.env || process.env;
  const send = options.fetch || fetch;
  const now = options.now || Date.now;
  const limits = new Map<string, { count: number; expires: number }>();
  const allowedOrigins = (env.CAREERS_ALLOWED_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean);

  router.use((req, res, next) => {
    const origin = req.get('origin');
    res.set('Cache-Control', 'no-store');
    res.vary('Origin');
    if (origin && origin !== `${req.protocol}://${req.get('host')}`) {
      if (!allowedOrigins.includes(origin)) return res.status(403).json({ success: false, saved: false, code: 'CAREERS_ORIGIN_REJECTED', message: 'This website is not allowed to submit applications.' });
      res.set('Access-Control-Allow-Origin', origin);
    }
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  router.post('/', (req, res, next) => {
    const time = now();
    for (const [ip, record] of limits) if (record.expires <= time) limits.delete(ip);
    const ip = req.ip || 'unknown';
    const record = limits.get(ip) || { count: 0, expires: time + 60000 };
    record.count++;
    limits.set(ip, record);
    if (record.count > 10) return res.status(429).json({ success: false, saved: false, code: 'CAREERS_RATE_LIMITED', message: 'Too many attempts. Please wait a minute and retry.' });
    next();
  }, express.json({ limit: '8mb' }), async (req, res) => {
    let applicationId: string | undefined;
    const unconfirmed = (status: number, code: string) => {
      // Only a known error category and random reference are logged, never upstream content.
      console.error(JSON.stringify({ service: 'careers', code, applicationId }));
      return res.status(status).json({ success: false, saved: false, code, applicationId,
        message: 'We could not confirm your application was saved. Your details are preserved; please retry with the same details.' });
    };
    try {
      const application = validateApplication(req.body);
      applicationId = application.applicationId;
      const scriptUrl = env.CAREERS_APPS_SCRIPT_URL?.trim();
      const secret = env.CAREERS_APPS_SCRIPT_SECRET;
      if (!scriptUrl || !secret || secret.length < 32 || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(scriptUrl)) return unconfirmed(503, 'CAREERS_CONFIGURATION');
      const result = await send(scriptUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...application, secret, spreadsheetId: CAREERS_SPREADSHEET_ID }),
        redirect: 'follow',
        signal: AbortSignal.timeout(90000),
      });
      const data = await result.json().catch(() => null);
      if (!result.ok || !data || typeof data !== 'object') return unconfirmed(502, 'CAREERS_UPSTREAM_RESPONSE');
      if (data.success !== true || data.saved !== true || data.applicationId !== applicationId) {
        const failures: Record<string, [number, string]> = {
          UNAUTHORIZED: [503, 'CAREERS_UPSTREAM_AUTH'],
          ID_CONFLICT: [409, 'CAREERS_ID_CONFLICT'],
          BUSY: [503, 'CAREERS_UPSTREAM_BUSY'],
          RATE_LIMITED: [429, 'CAREERS_RATE_LIMITED'],
          SAVE_FAILED: [502, 'CAREERS_SAVE_UNCONFIRMED'],
          INVALID_REQUEST: [502, 'CAREERS_UPSTREAM_CONTRACT'],
          VALIDATION_FAILED: [502, 'CAREERS_UPSTREAM_CONTRACT'],
          INVALID_RESUME: [502, 'CAREERS_UPSTREAM_CONTRACT'],
        };
        const failure = typeof data.code === 'string' && Object.hasOwn(failures, data.code) ? failures[data.code] : [502, 'CAREERS_UPSTREAM_RESPONSE'] as [number, string];
        return unconfirmed(failure[0], failure[1]);
      }
      res.status(200).json({ success: true, saved: true, applicationId: data.applicationId, duplicate: data.duplicate === true });
    } catch (error) {
      if (error instanceof CareerValidationError) return res.status(400).json({ success: false, saved: false, code: 'CAREERS_VALIDATION', message: error.message });
      if (error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name)) return unconfirmed(504, 'CAREERS_UPSTREAM_TIMEOUT');
      return unconfirmed(502, 'CAREERS_UPSTREAM_NETWORK');
    }
  });
  router.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(error.type === 'entity.too.large' ? 413 : 400).json({ success: false, saved: false, code: 'CAREERS_INVALID_REQUEST', message: error.type === 'entity.too.large' ? 'The resume must be no larger than 5 MB.' : 'Invalid application request. Please try again.' });
  });
  return router;
}
