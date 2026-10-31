import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import express from 'express';
import { createCareersRouter, validateApplication, CAREERS_SPREADSHEET_ID } from '../server/careers';
import { careersEndpoint, confirmedCareerResponse } from '../src/lib/careers-api';

const secret = 'test-only-secret-'.repeat(4);
const env = {
  CAREERS_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec',
  CAREERS_APPS_SCRIPT_SECRET: secret,
  CAREERS_ALLOWED_ORIGINS: 'https://wingscorporate.github.io',
};
function application(jobId = 'web-developer') {
  return {
    applicationId: randomUUID(), jobId,
    fields: {
      fullName: 'INTEGRATION TEST - Candidate', email: 'candidate@example.com', mobile: '9000000000',
      cityState: 'Kolkata, WB', experience: 'Fresher', noticePeriod: 'Immediately',
      qualification: 'Graduate', relevantSkills: 'Testing', consent: true,
      portfolioUrl: 'https://example.com/portfolio', coverLetter: 'Test message',
      webTechnologies: 'HTML, CSS', webPlatformExperience: 'WordPress', webProjects: 'https://example.com',
      bdSalesExperience: 'Lead research', bdLeadGen: 'CRM', bdTargets: 'Sales targets',
      metaAdsExperience: 'Meta', googleAdsExperience: 'Google', trackingExperience: 'GA4', optimizationExperience: 'ROAS',
    },
    resume: { name: 'test.pdf', type: 'application/pdf', base64: Buffer.from('%PDF-1.4\nTest fixture\n%%EOF').toString('base64') },
  };
}

// Executes the actual Apps Script against in-memory Google API doubles, never a live Sheet.
function scriptHarness(initialRows: any[][] = [], name = 'Career Applications') {
  const files = new Map<string, any>();
  const sheets: any[] = [];
  const state = { failBeforeWrite: false, failAfterWrite: false, privateFolder: true, flushes: 0 };
  function makeSheet(title: string, rows: any[][]) {
    const sheet: any = {
      rows, getName: () => title, getLastRow: () => rows.length,
      getLastColumn: () => Math.max(0, ...rows.map((row) => row.length)),
      getMaxColumns: () => 100, getMaxRows: () => 1000,
      insertColumnsAfter: () => {}, insertRowsAfter: () => {},
      getRange: (row: number, col: number, count = 1, columns = 1) => {
        const range: any = {
          getDisplayValues: () => Array.from({ length: count }, (_, r) => Array.from({ length: columns }, (_, c) => String(rows[row - 1 + r]?.[col - 1 + c] ?? ''))),
          getValue: () => rows[row - 1]?.[col - 1] ?? '',
          getRow: () => row,
          setNumberFormat: () => range,
          setValues: (values: any[][]) => {
            if (row > 1 && state.failBeforeWrite) { state.failBeforeWrite = false; throw new Error('Injected write failure'); }
            values.forEach((value, r) => {
              rows[row - 1 + r] ||= [];
              value.forEach((cell, c) => { rows[row - 1 + r][col - 1 + c] = cell; });
            });
            if (row > 1 && state.failAfterWrite) { state.failAfterWrite = false; throw new Error('Injected lost write acknowledgment'); }
            return range;
          },
          createTextFinder: (text: string) => {
            const finder: any = {
              matchEntireCell: () => finder,
              findNext: () => {
                for (let i = row - 1; i < row - 1 + count; i++) {
                  if (rows[i]?.[col - 1] === text) return sheet.getRange(i + 1, col);
                }
                return null;
              },
            };
            return finder;
          },
        };
        return range;
      },
    };
    sheets.push(sheet);
    return sheet;
  }
  const primary = makeSheet(name, structuredClone(initialRows));
  const book = {
    getSheets: () => sheets,
    getSheetByName: (title: string) => sheets.find((sheet) => sheet.getName() === title),
    insertSheet: (title: string) => makeSheet(title, []),
  };
  const cache = new Map();
  let locked = false;
  const sandbox: any = {
    console: { error: () => {}, log: () => {} },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (text: string) => ({ text, setMimeType() { return this; } }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (key: string) => ({ CAREERS_SHARED_SECRET: secret, CAREERS_RESUME_FOLDER_ID: 'private-folder' }[key] || null) }) },
    SpreadsheetApp: { openById: (id: string) => { assert.equal(id, CAREERS_SPREADSHEET_ID); return book; }, flush: () => state.flushes++ },
    LockService: { getScriptLock: () => ({ tryLock: () => { assert.equal(locked, false); locked = true; return true; }, hasLock: () => locked, releaseLock: () => { locked = false; } }) },
    CacheService: { getScriptCache: () => ({ get: (key: string) => cache.get(key), put: (key: string, value: string) => cache.set(key, value) }) },
    Utilities: {
      base64Decode: (base64: string) => [...Buffer.from(base64, 'base64')],
      newBlob: (bytes: number[], type: string, filename: string) => ({ bytes, type, filename }),
      formatDate: (_date: Date, zone: string) => { assert.equal(zone, 'Asia/Kolkata'); return '2026-10-31 15:30:00'; },
    },
    DriveApp: { Access: { PRIVATE: 'private' }, getFolderById: () => ({
      getSharingAccess: () => state.privateFolder ? 'private' : 'anyone',
      getFilesByName: (filename: string) => ({ hasNext: () => files.has(filename), next: () => files.get(filename) }),
      createFile: (blob: any) => {
        let description = '';
        const file = { setDescription: (value: string) => { description = value; }, getDescription: () => description, getSharingAccess: () => 'private', getUrl: () => `https://drive.google.com/file/d/test-${files.size + 1}/view` };
        files.set(blob.filename, file);
        return file;
      },
    }) },
  };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync('google-apps-script/Code.gs', 'utf8'), sandbox);
  const post = (payload: any) => JSON.parse(sandbox.doPost({ postData: { contents: JSON.stringify(payload) } }).text);
  return { primary, sheets, files, state, post };
}

async function apiHarness(t: any, send: any, configuration = env) {
  const app = express();
  app.use('/api/careers/applications', createCareersRouter({ env: configuration, fetch: send }));
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((resolve) => server.once('listening', resolve));
  t.after(() => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
  const address = server.address() as { port: number };
  return async (payload: any, origin?: string) => {
    const response = await fetch(`http://127.0.0.1:${address.port}/api/careers/applications`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...(origin ? { Origin: origin } : {}) }, body: JSON.stringify(payload),
    });
    return { status: response.status, body: await response.json(), response };
  };
}

test('all four job flows save exactly once with IST timestamp, mapped contact details, and private resume links', async (t) => {
  const script = scriptHarness();
  const post = await apiHarness(t, async (_url: string, options: any) => new Response(JSON.stringify(script.post(JSON.parse(options.body)))));
  for (const job of ['web-developer', 'business-development-associate', 'business-development-executive', 'performance-marketer']) {
    const payload = application(job);
    const results = await Promise.all([post(payload), post(payload)]);
    assert.ok(results.every((result) => result.status === 200 && result.body.saved === true));
    assert.equal(results.filter((result) => result.body.duplicate).length, 1);
  }
  assert.equal(script.primary.rows.length, 5);
  assert.equal(script.files.size, 4);
  for (const row of script.primary.rows.slice(1)) {
    assert.match(row[0], / IST$/);
    assert.equal(row[1], 'INTEGRATION TEST - Candidate');
    assert.equal(row[2], 'candidate@example.com');
    assert.equal(row[3], '9000000000');
    assert.ok(row[4]); assert.ok(row[5]);
    assert.match(row[8], /^https:\/\/drive.google.com\/file\//);
    assert.equal(row[9], 'https://example.com/portfolio');
    assert.equal(row[10], 'Test message');
    assert.equal(row[11], 'New');
  }
});

test('matches existing aliases, appends missing headers, preserves all existing data', () => {
  const rows = [['Name', 'Email', 'Job Role', 'HR Notes'], ['Existing candidate', 'existing@example.com', 'Web Developer', 'Keep this']];
  const script = scriptHarness(rows);
  const payload = { ...validateApplication(application()), secret, spreadsheetId: CAREERS_SPREADSHEET_ID };
  assert.equal(script.post(payload).saved, true);
  assert.deepEqual(script.primary.rows[1], rows[1]);
  assert.deepEqual(script.primary.rows[0].slice(0, 4), rows[0]);
  assert.equal(script.primary.rows[2][0], payload.fields.fullName);
  assert.equal(script.primary.rows[2][3], '');
});

test('unrelated tabs are untouched; formulas are stored as text', () => {
  const script = scriptHarness([['Revenue'], ['Unrelated data']], 'Sales');
  const input = application(); input.fields.fullName = '=IMPORTXML("https://example.com", "x")';
  assert.equal(script.post({ ...validateApplication(input), secret, spreadsheetId: CAREERS_SPREADSHEET_ID }).saved, true);
  assert.deepEqual(script.primary.rows, [['Revenue'], ['Unrelated data']]);
  assert.ok(script.sheets[1].rows[1][1].startsWith("'="));
});

test('failed writes retry safely, reuse uploaded resume, and detect lost acknowledgments', () => {
  for (const failure of ['failBeforeWrite', 'failAfterWrite'] as const) {
    const script = scriptHarness(); script.state[failure] = true;
    const payload = { ...validateApplication(application()), secret, spreadsheetId: CAREERS_SPREADSHEET_ID };
    assert.equal(script.post(payload).success, false);
    assert.equal(script.post(payload).saved, true);
    assert.equal(script.primary.rows.length, 2);
    assert.equal(script.files.size, 1);
  }
});

test('ID collisions with changed details fail; unauthorized scripts and public resume folders fail closed', () => {
  const script = scriptHarness(); const input = application();
  const payload = { ...validateApplication(input), secret, spreadsheetId: CAREERS_SPREADSHEET_ID };
  assert.equal(script.post({ ...payload, secret: 'wrong' }).success, false);
  assert.equal(script.primary.rows.length, 0);
  assert.equal(script.post(payload).saved, true);
  input.fields.fullName = 'Changed name';
  assert.equal(script.post({ ...validateApplication(input), secret, spreadsheetId: CAREERS_SPREADSHEET_ID }).code, 'ID_CONFLICT');
  assert.equal(script.primary.rows.length, 2);
  const publicFolder = scriptHarness(); publicFolder.state.privateFolder = false;
  assert.equal(publicFolder.post(payload).success, false);
  assert.equal(publicFolder.files.size, 0);
});

test('server rejects invalid fields, spoofed jobs, oversized resumes, executable URLs and fake file signatures', () => {
  for (const mutate of [
    (value: any) => { value.fields.email = 'bad'; },
    (value: any) => { value.fields.consent = false; },
    (value: any) => { value.jobId = 'not-a-job'; },
    (value: any) => { value.fields.webTechnologies = ''; },
    (value: any) => { value.fields.portfolioUrl = 'javascript:alert(1)'; },
    (value: any) => { value.resume.base64 = Buffer.from('not a pdf').toString('base64'); },
    (value: any) => { value.resume.base64 = Buffer.alloc(5 * 1024 * 1024 + 1).toString('base64'); },
  ]) {
    const input = application(); mutate(input);
    assert.throws(() => validateApplication(input));
  }
});

test('API fails on missing deployment, unconfirmed writes, and network failures, never false success', async (t) => {
  const unavailable = await apiHarness(t, () => { throw new Error('must not call'); }, {} as any);
  assert.equal((await unavailable(application())).status, 503);
  const unconfirmed = await apiHarness(t, async () => new Response(JSON.stringify({ success: true })));
  assert.equal((await unconfirmed(application())).body.success, false);
  const offline = await apiHarness(t, async () => { throw new Error('network timeout'); });
  assert.equal((await offline(application())).status, 502);
});

test('retry after a lost network response returns existing saved application, not a second row', async (t) => {
  const script = scriptHarness(); let loseResponse = true;
  const post = await apiHarness(t, async (_url: string, options: any) => {
    const result = script.post(JSON.parse(options.body));
    if (loseResponse) { loseResponse = false; throw new Error('lost response'); }
    return new Response(JSON.stringify(result));
  });
  const input = application();
  assert.equal((await post(input)).status, 502);
  assert.equal((await post(input)).body.duplicate, true);
  assert.equal(script.primary.rows.length, 2);
});

test('CORS restricts origins; rate limiter rejects the eleventh request', async (t) => {
  const post = await apiHarness(t, async () => new Response('{}'));
  assert.equal((await post(application(), 'https://untrusted.example')).status, 403);
  const allowed = await post(application(), 'https://wingscorporate.github.io');
  assert.equal(allowed.response.headers.get('access-control-allow-origin'), 'https://wingscorporate.github.io');
  for (let index = 0; index < 9; index++) await post(application());
  assert.equal((await post(application())).status, 429);
});

test('browser endpoint cannot target Apps Script, credentials, query strings or a missing Pages configuration', () => {
  assert.equal(careersEndpoint(undefined), '');
  assert.equal(careersEndpoint(undefined, true), '/api/careers/applications');
  assert.equal(careersEndpoint('https://script.google.com/macros/s/test/exec'), '');
  assert.equal(careersEndpoint('https://user:secret@example.com/api/careers/applications'), '');
  assert.equal(careersEndpoint('https://example.com/api/careers/applications?secret=private'), '');
  assert.equal(careersEndpoint('https://example.com'), '');
  assert.equal(careersEndpoint('https://example.onrender.com/api/careers/applications'), 'https://example.onrender.com/api/careers/applications');
});

test('browser confirmation rejects HTML, malformed or mismatched responses and never displays upstream secrets', async () => {
  const id = randomUUID();
  for (const body of ['<html>Proxy error</html>', 'null', '{}', JSON.stringify({ success: true }), JSON.stringify({ success: true, saved: true, applicationId: randomUUID() }), JSON.stringify({ success: false, message: 'private-server-secret' })]) {
    await assert.rejects(confirmedCareerResponse(new Response(body), id), (error: Error) => error.message.includes('CAREERS_RESPONSE_UNCONFIRMED') && !error.message.includes('private-server-secret'));
  }
  await confirmedCareerResponse(new Response(JSON.stringify({ success: true, saved: true, applicationId: id })), id);
});

test('every unconfirmed fallback rejects false success, missing IDs, primitive JSON and non-2xx confirmations', async () => {
  const id = randomUUID();
  const responses = [
    new Response('not-json'),
    new Response('null'),
    new Response('true'),
    new Response('[]'),
    new Response(JSON.stringify({ success: true, saved: true })),
    new Response(JSON.stringify({ success: true, saved: false, applicationId: id })),
    new Response(JSON.stringify({ success: true, saved: true, applicationId: 'different-id' })),
    new Response(JSON.stringify({ success: true, saved: true, applicationId: id }), { status: 500 }),
    new Response(JSON.stringify({ success: false, code: 'invalid-private-error', message: 'private details' }), { status: 502 }),
  ];
  for (const response of responses) {
    await assert.rejects(confirmedCareerResponse(response, id), (error: Error) => error.message.includes('CAREERS_RESPONSE_UNCONFIRMED') && !error.message.includes('private details'));
  }
  await assert.rejects(confirmedCareerResponse(new Response(JSON.stringify({ success: false, code: 'CAREERS_UPSTREAM_AUTH' }), { status: 503 }), id), /CAREERS_UPSTREAM_AUTH/);
  await confirmedCareerResponse(new Response(JSON.stringify({ success: true, saved: true, applicationId: id, duplicate: true })), id);
});

test('API distinguishes authentication, malformed responses, persistence uncertainty, conflicts and timeouts safely', async (t) => {
  const cases: Array<[() => Promise<Response>, number, string]> = [
    [async () => new Response(JSON.stringify({ success: false, code: 'UNAUTHORIZED', secret: 'private-server-secret' })), 503, 'CAREERS_UPSTREAM_AUTH'],
    [async () => new Response('<html>Google sign-in or redirect</html>'), 502, 'CAREERS_UPSTREAM_RESPONSE'],
    [async () => new Response('null'), 502, 'CAREERS_UPSTREAM_RESPONSE'],
    [async () => new Response(JSON.stringify({ success: false, code: 'SAVE_FAILED' })), 502, 'CAREERS_SAVE_UNCONFIRMED'],
    [async () => new Response(JSON.stringify({ success: false, code: 'ID_CONFLICT' })), 409, 'CAREERS_ID_CONFLICT'],
    [async () => { throw new DOMException('private-server-secret', 'TimeoutError'); }, 504, 'CAREERS_UPSTREAM_TIMEOUT'],
  ];
  for (const [upstream, status, code] of cases) {
    const post = await apiHarness(t, upstream);
    const result = await post(application());
    assert.equal(result.status, status);
    assert.equal(result.body.code, code);
    assert.equal(result.body.saved, false);
    assert.equal(JSON.stringify(result.body).includes('private-server-secret'), false);
  }
});

test('backend follows Apps Script redirects explicitly and sends the shared secret only to that backend endpoint', async (t) => {
  let requests = 0;
  const post = await apiHarness(t, async (url: string, options: any) => {
    requests++;
    assert.equal(url, env.CAREERS_APPS_SCRIPT_URL);
    assert.equal(options.redirect, 'follow');
    const payload = JSON.parse(options.body);
    assert.equal(payload.secret, secret);
    return new Response(JSON.stringify({ success: true, saved: true, applicationId: payload.applicationId }));
  });
  const result = await post(application());
  assert.equal(requests, 1);
  assert.equal(result.body.saved, true);
  assert.equal(JSON.stringify(result.body).includes(secret), false);
});
