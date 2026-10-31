// Shared by the browser and the Pages build check. No server configuration belongs here.
export function careersEndpoint(configured: string | undefined, allowSameOrigin = false): string {
  const value = configured?.trim();
  if (!value) return allowSameOrigin ? '/api/careers/applications' : '';
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash ||
      /(^|\.)google(?:usercontent)?\.com$/i.test(url.hostname) ||
      !/^\/api\/careers\/applications\/?$/.test(url.pathname)) return '';
    return url.href;
  } catch { return ''; }
}

export async function confirmedCareerResponse(response: Response, applicationId: string) {
  const body = await response.json().catch(() => null);
  if (response.ok && body?.success === true && body?.saved === true && body?.applicationId === applicationId) return;
  // Never render arbitrary error text from an upstream server or proxy.
  const messages: Record<string, string> = {
    CAREERS_UPSTREAM_AUTH: 'The application service needs administrator attention. Your details are preserved; please retry later.',
    CAREERS_CONFIGURATION: 'Applications are temporarily unavailable. Your details are preserved; please retry later.',
    CAREERS_RATE_LIMITED: 'Too many attempts. Please wait a minute before retrying with the same details.',
    CAREERS_ID_CONFLICT: 'This application reference was already saved with different details. Please contact HR before submitting again.',
  };
  const code = typeof body?.code === 'string' && /^CAREERS_[A-Z_]{1,40}$/.test(body.code) ? body.code : 'CAREERS_RESPONSE_UNCONFIRMED';
  throw new Error(`${messages[code] || 'We could not confirm your application was saved. Your details are preserved; please retry with the same details.'} Reference: ${code}.`);
}
