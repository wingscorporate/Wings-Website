# Render deployment of the existing Careers API

## Current state

- The administrator supplied an Apps Script `/exec` URL and reports version 1 deployed with Google Sheet and restricted Drive-folder access verified.
- That URL is stored only in the ignored local `.env` as `CAREERS_APPS_SCRIPT_URL`. No shared secret has been provided or added to source control.
- The existing handler is `server/careers.ts`, reused by both the full Node website and `server/careers-server.ts`. No second implementation is needed.
- A live empty unauthenticated POST to the supplied Apps Script deployment returned `UNAUTHORIZED`. No candidate data or resume was sent. This verifies rejection only, not successful persistence.
- Render credentials, the shared secret, and the deployed Render API URL remain unavailable to this workspace. Live successful application persistence has not been verified.
- Website design, styles, animations, and layout are unchanged by this deployment configuration.

## 1. Publish the prepared integration code

The integration files must be committed and pushed to the repository's `main` branch before Render can build them. Include the existing integration changes, tests, documentation, and `render.yaml`; exclude `.env` and `.careers-test-results.json`. Both are gitignored. Never commit a live secret.

## 2. Configure one Render Web Service

If a Careers API Web Service already exists, edit its settings. Do not create another one. Otherwise choose **New → Web Service**, connect `wingscorporate/Wings-Website`, and enter:

| Setting | Value |
| --- | --- |
| Name | `wings-careers-api` |
| Branch | `main` |
| Runtime | Node |
| Root Directory | Leave blank: use the repository root containing `package.json` |
| Build Command | `npm ci --include=dev && npm run build:careers` |
| Start Command | `npm run start:careers` |
| Health Check Path | `/api/health` |

Source directory is `server/`, but **do not** use that as Render's Root Directory: the handler also imports the job catalog under `src/data/`. The artifact is `dist/careers.cjs`. Use a Web Service with an HTTPS endpoint reachable from the browser, while keeping server configuration private.

Alternatively, for a new service use **New → Blueprint** with `render.yaml`. It requests the URL and secret interactively (`sync: false`). The file selects the free plan for testing; cold starts and Google quotas still apply. Use either the dashboard service path or the Blueprint path, not both. For an existing service, manual settings avoid accidentally creating a duplicate.

Render references: https://render.com/docs/deploy-node-express-app and https://render.com/docs/blueprint-spec

## 3. Set backend environment variables

In the Render service's **Environment** screen, set:

| Name | Exact value/source |
| --- | --- |
| `NODE_VERSION` | `22` |
| `NODE_ENV` | `production` |
| `CAREERS_APPS_SCRIPT_URL` | The deployed `/exec` URL supplied by the administrator; copy it from the ignored local `.env` |
| `CAREERS_APPS_SCRIPT_SECRET` | Exact same value as Apps Script property `CAREERS_SHARED_SECRET` |
| `CAREERS_ALLOWED_ORIGINS` | `https://wingscorporate.github.io`, plus the actual custom-domain origin if used, comma-separated |
| `CAREERS_TRUST_PROXY_HOPS` | `0` initially; configure the verified trusted proxy count before public production use |

Enter the secret directly in Render. Do not send it in chat, include it in `render.yaml`, or prefix it with `VITE_`. Render variables are independent of your local `.env`: configuring one does not configure the other. `GOOGLE_SERVICE_ACCOUNT_JSON`, the Drive folder ID, and `GEMINI_API_KEY` are not needed by this dedicated API. The Drive folder ID remains in Apps Script Properties. Let Render supply `PORT`; the server binds to `0.0.0.0`.

Origins must have no path or trailing slash. For a custom domain, copy `location.origin` from that website's browser console. With proxy hops at `0`, request limits can group users behind a Render proxy; verify the proxy count with the hosting configuration before setting a larger value. Do not blindly enable trust for all forwarded headers.

Click **Save, rebuild, and deploy**. Open `https://YOUR-SERVICE.onrender.com/api/health`; expect `{"status":"ok"}`. This only confirms the Node process responds, not Google persistence.

## 4. Confirm the intended Sheet tab

The setup log listing `Sheet1` verifies it exists, not that it is selected for submissions. To use it, set Apps Script property `CAREERS_SHEET_NAME` to `Sheet1` if that tab is empty or contains recognizable application headers. If it contains unrelated records without recognizable headers, use a separate careers tab. No code changes are required for this property. Existing records must remain untouched.

Confirm the deployed Web App runs as the authorized owner and accepts backend requests without Google sign-in. Public writes still require the private shared secret. Saving code changes in Apps Script requires deploying a new version to update `/exec`.

## 5. Set the public GitHub Pages API URL

In **GitHub → repository Settings → Secrets and variables → Actions → Variables**, create/update:

```env
VITE_CAREERS_API_URL=https://YOUR-SERVICE.onrender.com/api/careers/applications
```

Use the Render URL, never the Apps Script URL or secret. The workflow now defaults VITE_CAREERS_API_URL to https://wings-careers-api.onrender.com/api/careers/applications if no repository variable is set. An explicit override must still be valid; malformed or direct-Google endpoints are rejected before building. It reads the public URL at build time, runs the simulated API tests, and uses `npm run build:frontend` so the Pages artifact contains only browser assets. After setting it, run **Actions → Deploy GitHub Pages → Run workflow** on `main`. A successful API deployment alone does not update an already-built frontend.

## 6. Live verification and cleanup

First open the health URL and let the service finish waking if it uses the free plan. From PowerShell at the project root:

```powershell
$env:CAREERS_TEST_API_URL = 'https://YOUR-SERVICE.onrender.com/api/careers/applications'
node scripts/verify-careers.mjs
```

The runner intentionally submits four synthetic applications (one per role), twice concurrently per UUID. It saves the UUIDs in `.careers-test-results.json` before making requests. Expected: four saved rows, not eight, with one duplicate acknowledgment per pair. If it fails, inspect those IDs before rerunning: another run creates new IDs.

1. Set Apps Script property `CAREERS_TEST_APPLICATION_IDS` to the runner's four comma-separated UUIDs.
2. Run `verifyCareerTestApplications` in the Apps Script editor. Verify exactly one row per ID, distinct positions, correct names/contact details, IST timestamp, `New` status, and restricted resume links.
3. Open each test resume link as HR; verify the PDF is readable. Confirm an account without folder access cannot open it. Review role/department and portfolio/message values in the Sheet.
4. Run `cleanupCareerTestApplications` to remove only the four identified synthetic rows and PDFs. Verify existing records remain. If fewer than four rows were saved, inspect and clean up only manifest IDs manually; do not relax the helper's safeguards.
5. After the rate-limit window has passed, test the actual deployed website: required fields; PDF/DOC/DOCX/size validation; rapid Submit clicks; and a browser-network failure followed by an unchanged retry. The form must preserve answers/file on failure, show no premature success, and produce one row after retry. Remove these additional explicitly marked synthetic records/resumes after inspecting their IDs.

Expected success text: "Your application has been submitted successfully. Our HR team will contact you if your profile is shortlisted."

Local tests simulate Google and do not establish live success. Complete the Render → Apps Script → Sheet/Drive checks and the browser tests before claiming the integration is working.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Build cannot find package.json or src/data | Leave Root Directory blank; use the repository root |
| esbuild is missing | Build with `npm ci --include=dev && npm run build:careers` |
| 503 response | Script URL or secret is missing/too short in Render |
| 502 response | `/exec` deployment access, matching secret, deployed code version, selected Sheet headers, restricted Drive folder, or Google quota |
| 403/CORS error | Exact frontend origin is absent from `CAREERS_ALLOWED_ORIGINS` |
| 429 response | Wait a minute; verify the trusted proxy count for per-client rate limits |
| 409 response | That UUID was already saved with different details; inspect the existing application before trying again |
| Health works but form is disabled | Set the GitHub repository variable and rebuild Pages |

No secrets or full candidate payloads should be included in troubleshooting screenshots or logs.

The browser now displays a sanitized `CAREERS_*` reference, also recorded with the random application ID in Render logs. `CAREERS_UPSTREAM_AUTH` identifies a rejected shared secret; `CAREERS_UPSTREAM_RESPONSE` identifies malformed/unexpected upstream confirmation (including Google sign-in HTML); `CAREERS_UPSTREAM_TIMEOUT` identifies an uncertain timeout; and `CAREERS_SAVE_UNCONFIRMED` identifies a Google persistence error. These do not assert that no row was saved. Retry unchanged to keep the same ID.

For the latest live verification and exact confirmation-error paths, see `docs/careers-confirmation-investigation.md`. Four synthetic applications were verified in Career Applications; editor-side cleanup remains pending.

## Investigation evidence

On inspection, the public Pages site served `CareersApplicationModal-DuV6BTp9.js`, whose submit handler had no `fetch` call, no application UUID, and the old missing-configuration error. The local branch and fetched `origin/main` both pointed to `3618c50`, while the entire Sheets/API integration remained uncommitted. This establishes a deployment mismatch for that public Pages URL. It does not establish the exact upstream cause of a different local/custom-domain generic error without that request's status/code or the exact deployed Render URL.

The shared secret and Render URL were unavailable during investigation, so no authenticated live candidate row or resume write is claimed. The automated tests use simulated Sheets/Drive. After deployment, follow the live verification and cleanup instructions above.
