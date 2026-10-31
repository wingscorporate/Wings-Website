import { careersEndpoint } from '../src/lib/careers-api';

if (!careersEndpoint(process.env.VITE_CAREERS_API_URL)) {
  console.error('Set repository variable VITE_CAREERS_API_URL to the deployed HTTPS Render endpoint ending in /api/careers/applications. An Apps Script URL, missing value, query string, or credential is not allowed.');
  process.exitCode = 1;
} else {
  console.log('Careers public API endpoint configuration is valid.');
}
