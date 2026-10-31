import 'dotenv/config';
import express from 'express';
import { createCareersRouter } from './careers';

// Dedicated API for static GitHub Pages deployments. No application/admin data is served.
const app = express();
app.disable('x-powered-by');
const proxyHops = Number(process.env.CAREERS_TRUST_PROXY_HOPS || 0);
if (Number.isInteger(proxyHops) && proxyHops > 0 && proxyHops <= 5) app.set('trust proxy', proxyHops);
app.use('/api/careers/applications', createCareersRouter());
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('Careers API listening'));
