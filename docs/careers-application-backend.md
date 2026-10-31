# Careers application integration and deployment

## Status

Implementation is prepared but **live Google integration has not been verified**. The administrator reports Apps Script version 1 deployed successfully and Google Sheet/Drive access verified. The supplied deployment URL is now configured in the ignored local `.env`; the shared secret and Render API host still require administrator configuration. The supplied Sheet could not be inspected through the available connection. Local automated tests use simulated Sheets/Drive and create no live rows. Do not claim production submissions work until the live verification below passes.

Target Sheet: https://docs.google.com/spreadsheets/d/1l2dZKRKQuczOR9nh0vc1WMtTshbgBFp3zyZoRZz_FSE/edit

All four jobs use the existing modal. Layout, styling, animations, and responsive classes are retained. Submission behavior and the requested success/error text are updated.

## 1. Exactly where to paste the Apps Script

1. Open the target Sheet above as an account with Editor access.
2. Choose **Extensions → Apps Script**.
3. Open **Code.gs** in the left editor. In a new project, replace the default `myFunction()` with the **entire contents of `google-apps-script/Code.gs`** from this repository. Save.
4. If there are existing scripts, preserve them. Add this code in a separate file and resolve any existing `doPost` handler before deploying; a project must have one unambiguous `doPost` endpoint.
5. Open **Project Settings** and enable **Show appsscript.json manifest file in editor**. Copy `google-apps-script/appsscript.json` into the manifest. If reusing an existing project, merge the scopes/settings without removing its existing ones.

## 2. Resume folder and Script Properties

1. In Google Drive, create **WINGS Careers Resumes**, owned by the deploying account.
2. Set its **General access → Restricted**. Explicitly share it with the HR users/group that must open resumes. Sheet access alone does not grant resume access. Do not enable public or domain-wide link sharing.
3. Copy the folder ID from `https://drive.google.com/drive/folders/FOLDER_ID`.
4. Generate a secret locally, for example:

   ```text
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   Keep it in your password manager/hosting secret settings. Do not put it in chat, source code, GitHub repository variables, or any `VITE_*` setting.
5. In Apps Script **Project Settings → Script Properties → Add script property**, set:

| Property | Value |
| --- | --- |
| `CAREERS_SHARED_SECRET` | The generated random secret, at least 32 characters |
| `CAREERS_RESUME_FOLDER_ID` | Restricted Drive folder ID |
| `CAREERS_SHEET_NAME` | Optional: exact existing careers tab name, or a new empty tab name |

6. Select **verifyCareerSetup** in the editor's function selector and click **Run**. Review and grant Sheets/Drive permissions using the account that can edit both resources. Resolve any Workspace administrator restrictions. This check does not create or delete sheet rows.

Without an explicit tab name, the script reuses a tab with recognizable name/email/position headers; otherwise it creates **Career Applications**. If multiple careers tabs exist, explicitly configure the intended name. It refuses existing data without recognizable headers rather than overwriting it. A nonexistent configured tab is created.

Existing columns are matched using common aliases (`Name`, `Email`, `Mobile`, `Job Role`, `Resume Link`, etc.). Missing headers are added to the right. Existing headers, old records, and unrelated tabs are preserved. Each new record is appended after the last used row; unknown columns are blank on new rows. Candidate input that could be interpreted as a formula is stored as text.

Default columns:

- Application Date & Time (IST)
- Candidate Full Name
- Email Address
- Phone Number
- Position Applied For
- Department
- Experience
- Current Location
- Resume/CV Link
- Portfolio Link
- Additional Message
- Application Status (New)
- Application ID
- Application Fingerprint
- Additional Application Details

The last column preserves every extra form field as JSON: WhatsApp, CTC, qualifications, notice period, role answers, profile links, consent, etc. Do not remove ID/fingerprint columns; they make retries safe.

## 3. Deploy the Apps Script Web App

1. **Deploy → New deployment → Select type → Web app**.
2. Set **Execute as → Me**, using the account authorized above.
3. Set **Who has access → Anyone**, so the Node backend can call it without a Google login. Every write still requires the private server-held secret. If Workspace disallows this deployment mode, an administrator must permit it or provide an alternative authenticated API backend. Never expose a Google credential in the browser.
4. Click **Deploy** and copy the URL ending in **/exec**. Do not use the editor-only **/dev** URL.
5. After future code changes, use **Deploy → Manage deployments → Edit → New version → Deploy**; saving alone does not update a deployment.

Google reference: https://developers.google.com/apps-script/guides/web

## 4. Deploy the private Node API

GitHub Pages cannot run Node, keep a secret, or process uploads. The browser must call the Node API, **not the Apps Script URL**. The backend handles validation, request limits, and the secret; it also avoids browser Apps Script CORS/redirect restrictions.

For the existing full Node app, use `npm run build` and `npm start`. For GitHub Pages, deploy the supplied dedicated API on a Node 22+ HTTPS hosting service:

```text
Install: npm ci
Build: npm run build:careers
Start: npm run start:careers
```

Set these server-only variables in the host's configuration/secrets UI:

```env
CAREERS_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
CAREERS_APPS_SCRIPT_SECRET=<same value as CAREERS_SHARED_SECRET>
CAREERS_ALLOWED_ORIGINS=https://wingscorporate.github.io
```

Add the actual custom-domain origin if applicable, comma-separated. Origins contain scheme/host only, no `/Wings-Website/` path or trailing slash. Set `CAREERS_TRUST_PROXY_HOPS` only to the known trusted proxy count in front of the dedicated API (for example `1`). Incorrect settings can allow spoofed IPs. It listens on the host's `PORT` or 3000. `/api/health` exposes no candidate data. The dedicated API has no candidate/admin list endpoint.

The server accepts JSON with a base64 resume (PDF/DOC/DOCX, maximum 5 MB), validates signatures and all required fields, whitelists form fields, and derives role/department from the existing job list. It rejects disallowed browser origins and limits IPs to ten attempts/minute. Apps Script limits authenticated new writes to sixty/minute under its script lock. This is basic abuse protection; Google account quotas still apply. Signature checks are not malware scanning; HR should use normal document security controls.

No Google credentials or secrets are sent to the browser. Careers data is not written to `leads.json`, public endpoints, or application logs. Resumes remain restricted to authorized HR users.

## 5. Connect the website

For GitHub Pages, open the repository **Settings → Secrets and variables → Actions → Variables** and add:

```env
VITE_CAREERS_API_URL=https://YOUR_API_HOST/api/careers/applications
```

This is the public Node endpoint URL, not a secret or Apps Script URL. The Pages workflow now reads this variable at build time. Redeploy the website after changing it. Local/full Node hosting at `/` defaults to `/api/careers/applications`; `.env` can override the URL when needed.

The form revalidates every step, prevents simultaneous submits, and preserves answers/resume on failure. A stable UUID is reused for retries while the component remains open. Apps Script checks that ID and the payload fingerprint under a lock before writing. The script reads back the new application ID, and both the API and browser require confirmed `saved: true` before displaying success.

If a response is lost after Google saved the row, retry unchanged; the existing row is acknowledged instead of appended again. Changed details against an already-saved ID produce a conflict, so contact HR instead of blindly resubmitting. Reloading or opening a new tab creates a new attempt; drafts/IDs are not permanently stored in the browser.

A resume is retained after an uncertain Sheet write and reused by an unchanged retry. Administrators should periodically inspect old unreferenced files by application ID before removing orphans. Never delete a resume immediately after an ambiguous timeout: its row may have been saved.

## 6. Live verification and safe test cleanup

Run only after both deployments are configured. These steps intentionally create clearly marked synthetic records; no real candidate data is needed.

1. Set local `CAREERS_TEST_API_URL` to the deployed Node HTTPS endpoint, then run:

   ```text
   node scripts/verify-careers.mjs
   ```

   It saves four UUIDs to `.careers-test-results.json` (gitignored) before requests begin. Each role is submitted twice concurrently with the same UUID. Both responses must confirm persistence, and one must acknowledge a duplicate. If a run fails, inspect those IDs first rather than blindly running again with new IDs.
2. Set Apps Script property **CAREERS_TEST_APPLICATION_IDS** to the four printed comma-separated UUIDs. Run **verifyCareerTestApplications** in the editor. It reads back the real Sheet and verifies exactly one row per ID, four distinct positions, test name/email/phone, IST timestamp, New status, and restricted resume links/fingerprints.
3. As HR, open all four resume links and verify the test PDF is readable. Confirm an unauthorized Google account cannot open them. Review role/department values. The API runner alone is not sufficient to claim end-to-end success.
4. In the actual website, test required fields, double-click Submit, and simulate a network failure with browser DevTools. A failure must retain answers/file and show no success; unchanged retry must create no duplicate. Record any additional synthetic IDs and remove those specific extra test records manually after verifying their test markers.
5. After reviewing the four runner records, run **cleanupCareerTestApplications** in the editor. It only deletes records with the exact four UUIDs, matching `INTEGRATION TEST - ` names, matching `integration-test+UUID@example.com` addresses, and verified resume links/fingerprints. It trashes their test PDFs and deletes rows from bottom to top. No delete action is exposed by `doPost`.
6. Confirm only those test rows/files were removed. If a failed run saved fewer than four records or unexpected duplicates exist, the cleanup helper refuses to operate; inspect/remove only IDs from the manifest manually, without relaxing its safeguards.

Local regression checks:

```text
npm run test:careers
npm run lint
npm run build
npm run build:careers
```

These simulate Google services to check all roles, existing-column aliases, preservation of existing rows, file validation, failed writes, lost acknowledgments, duplicate retries, ID conflicts, restricted folders, safe API errors, CORS, and rate limiting. They do not replace live Google/browser verification.

## Render-specific deployment

Use `docs/render-careers-deployment.md` for the exact Render settings. `render.yaml` configures the existing Careers API entry point; it does not introduce another backend. The Pages workflow now uses `npm run build:frontend`, so it publishes no Node API bundle.

## Administrator handoff

Provide the public Apps Script `/exec` URL and the public Node API URL when deployed. Set the matching secret directly in Script Properties and backend hosting secrets; do not send it in chat. Complete the live verification and cleanup before marking production integration working.
