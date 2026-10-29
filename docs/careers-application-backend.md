# Careers application backend

The Careers form is intentionally disabled for production submission until a secure upload endpoint is configured. GitHub Pages serves static files and must not receive resumes or contain private API credentials.

## Frontend configuration

Set this public Vite variable at build time:

```env
VITE_CAREERS_API_URL=https://your-secure-api.example.com/careers/applications
```

Do not put storage keys, email credentials, or administrator tokens in `VITE_*` variables.

## Endpoint contract

The endpoint must accept `POST multipart/form-data`. The file field is `resume`; the remaining fields are the application fields sent by `CareersApplicationModal`, including `jobId`, `jobRole`, and `department`.

The server must validate the file type and 5 MB limit again, sanitize all text, protect stored resumes from public access, and return JSON with this shape only after persistence and notification succeed:

```json
{ "success": true }
```

On failure, return a non-2xx response and an optional safe `{ "message": "..." }`. The frontend preserves the candidate's data and allows a retry.

## Recommended server responsibilities

- Store applications and resumes in private storage with access-controlled administrator views.
- Notify `retail@wings-marketing.com` from the server after a successful write.
- Provide authenticated admin tools for role filtering, secure resume download, and status tracking (`New`, `Under Review`, `Shortlisted`, `Rejected`, `Hired`).
- Add rate limiting, malware scanning, CORS restrictions, and retention/deletion policies before going live.
