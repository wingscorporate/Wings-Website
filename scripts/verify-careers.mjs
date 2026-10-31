// Explicitly run AFTER an administrator deploys both the Apps Script and the Node API.
// Creates synthetic rows in the real Sheet. Follow the documented verification/cleanup steps.
import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const api = process.env.CAREERS_TEST_API_URL;
if (!api || !/^https:\/\//.test(api)) throw new Error('Set CAREERS_TEST_API_URL to the deployed HTTPS Node API /api/careers/applications URL.');
const jobs = ['web-developer', 'business-development-associate', 'business-development-executive', 'performance-marketer'];
const receipts = jobs.map((jobId) => ({ jobId, applicationId: randomUUID(), verifiedApi: false }));
const output = '.careers-test-results.json';
writeFileSync(output, JSON.stringify(receipts, null, 2));
console.log('Test-only IDs (also saved to ' + output + '):');
console.log(receipts.map((receipt) => receipt.applicationId).join(','));

// Minimal valid, single-page PDF containing no candidate information.
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
  '<< /Length 57 >>\nstream\nBT /F1 12 Tf 72 720 Td (INTEGRATION TEST - NOT A CV) Tj ET\nendstream',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
];
// Compute the stream length rather than relying on hand-counted text.
const stream = 'BT /F1 12 Tf 72 720 Td (INTEGRATION TEST - NOT A CV) Tj ET\n';
objects[3] = `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`;
let pdf = '%PDF-1.4\n';
const offsets = [0];
objects.forEach((body, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${index + 1} 0 obj\n${body}\nendobj\n`; });
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map((offset) => String(offset).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

for (const receipt of receipts) {
  const body = JSON.stringify({
    applicationId: receipt.applicationId, jobId: receipt.jobId,
    fields: {
      fullName: 'INTEGRATION TEST - ' + receipt.jobId,
      email: `integration-test+${receipt.applicationId}@example.com`,
      mobile: '9000000000', cityState: 'Kolkata, WB', experience: 'Fresher',
      noticePeriod: 'Immediately', qualification: 'Test graduate', relevantSkills: 'INTEGRATION TEST',
      consent: true, portfolioUrl: 'https://example.com/portfolio', coverLetter: 'INTEGRATION TEST - remove after verification',
      webTechnologies: 'Test HTML/CSS', webPlatformExperience: 'Test WordPress', webProjects: 'https://example.com',
      bdSalesExperience: 'Test sales', bdLeadGen: 'Test CRM', bdTargets: 'Test targets',
      metaAdsExperience: 'Test Meta', googleAdsExperience: 'Test Google', trackingExperience: 'Test GA4', optimizationExperience: 'Test ROAS',
    },
    resume: { name: 'integration-test.pdf', type: 'application/pdf', base64: Buffer.from(pdf).toString('base64') },
  });
  const submit = async () => {
    const response = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, signal: AbortSignal.timeout(120000) });
    const result = await response.json().catch(() => null);
    receipt.lastHttpStatus = response.status;
    receipt.lastCode = typeof result?.code === 'string' && /^CAREERS_[A-Z_]+$/.test(result.code) ? result.code : 'NO_STRUCTURED_CODE';
    writeFileSync(output, JSON.stringify(receipts, null, 2));
    if (!response.ok || result?.saved !== true || result?.applicationId !== receipt.applicationId) throw new Error(`Unconfirmed save for ${receipt.jobId}: HTTP ${response.status}, ${receipt.lastCode}. Inspect the recorded application ID before retrying or cleaning up.`);
    return result;
  };
  const results = await Promise.all([submit(), submit()]);
  if (results.filter((result) => result.duplicate).length !== 1) throw new Error(`Unexpected duplicate acknowledgment for ${receipt.jobId}`);
  receipt.verifiedApi = true;
  writeFileSync(output, JSON.stringify(receipts, null, 2));
  console.log(receipt.jobId + ': confirmed API save + duplicate retry acknowledgment');
}
console.log('API checks completed. Run verifyCareerTestApplications in Apps Script, open the four resume links as HR, then run cleanupCareerTestApplications. Live Sheet verification is not complete until those steps pass.');
