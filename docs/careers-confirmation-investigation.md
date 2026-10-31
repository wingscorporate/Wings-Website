# CAREERS_RESPONSE_UNCONFIRMED investigation

## What was established

- Live Render health returned HTTP 200. A browser-origin preflight for `https://wingscorporate.github.io` returned 204 with the matching allowed origin. An empty POST returned HTTP 400 with `CAREERS_VALIDATION`, demonstrating the expected structured JSON contract.
- The public Pages site still served `CareersApplicationModal-DuV6BTp9.js`: the old form with no fetch, application UUID or confirmation helper. It cannot be the source of the reported new reference without a different URL/build/cache being involved. The exact failing browser request remains necessary for attribution.
- Previous Pages deployment was blocked by missing/invalid `VITE_CAREERS_API_URL`. The workflow now defaults that build-time variable to the supplied and tested public Render endpoint, while allowing an explicit repository-variable override. This does not expose a Google credential or Apps Script URL.
- The live verification runner successfully submitted all four roles and retried each UUID concurrently. Independent read-only Sheet checks found exactly one row per UUID in **Career Applications**, and zero matching test rows in **Sheet1**.
- Candidate test name, email, phone, position, department, IST timestamp, New status and resume link were verified on those four rows. Anonymous download attempts for their test resumes were blocked. Authenticated HR download/opening still requires an HR account to verify.

No generic error was converted into success, and no Drive sharing was weakened. The exact reported browser response could not be reproduced using the tested Render endpoint. Therefore it is not claimed fixed solely by these successful API tests.

## Every path to CAREERS_RESPONSE_UNCONFIRMED

The fallback exists only in `src/lib/careers-api.ts`, when a response fails confirmation and has no recognized `CAREERS_*` code. This includes:

1. Non-JSON/empty/truncated responses, including HTML from an incorrect route or proxy.
2. JSON null, primitives, arrays or unexpected object shapes without the expected error code.
3. Missing/false `success`, missing/false `saved`, or missing/mismatched `applicationId` without a recognized error code.
4. A non-2xx HTTP response, even if its body otherwise looks like a saved confirmation, without a recognized error code.

Known backend codes are propagated instead. Browser fetch/network failures bypass this helper and use the connection-failed message; backend fetch/timeouts generate `CAREERS_UPSTREAM_NETWORK` or `CAREERS_UPSTREAM_TIMEOUT`.

The existing backend follows Google redirects, parses JSON, maps sanitized error categories, and only confirms a successful matching ID. Apps Script writes under a script lock, flushes, and reads the ID back before acknowledging persistence. Stable IDs and fingerprints make unchanged retries idempotent. Failed/uncertain responses leave form answers and the selected file intact while the component remains mounted.

## Information still needed for the reported browser failure

Send the failing page's exact URL and the request's URL, HTTP status, response Content-Type and sanitized Response body from DevTools Network, together with any matching Render application ID/error code. Do not send the request payload, resume, contact details, secret, or complete Google redirect URL. Without this evidence, choosing among an old page, a wrong route, a proxy response or a contract mismatch would be guessing.

## Synthetic test cleanup is pending

The four created test IDs and verified results are in the ignored local `.careers-test-results.json`. They contain synthetic data only. They have not been deleted because authenticated Google editor access is unavailable here.

In Apps Script, set Script Property `CAREERS_TEST_APPLICATION_IDS` to those four comma-separated IDs, run `verifyCareerTestApplications`, open the test resumes as HR, then run `cleanupCareerTestApplications`. It validates the UUID/name/email/file markers before deleting only those test rows and PDFs. No real candidate records were changed. Do not rerun the live runner blindly: it generates a new set of test IDs.

The supplied Sheet's CSV export was readable without Google sign-in during verification. Only the synthetic rows were reported. An administrator should restrict Sheet sharing to authorized HR users if it contains candidate information; resume access remains separately restricted. No sharing settings were changed by this investigation.
