import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const compiled = await build({
  entryPoints: ['app/api/contact/route.ts'], bundle: true, write: false, platform: 'node', format: 'esm',
  plugins: [{ name: 'mock-cloudflare', setup(builder) {
    builder.onResolve({ filter: /^@opennextjs\/cloudflare$/ }, () => ({ path: 'context', namespace: 'mock' }));
    builder.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({ contents: 'export const getCloudflareContext = async () => globalThis.contactTestContext;' }));
  } }],
});
const { POST, GET } = await import('data:text/javascript;base64,' + Buffer.from(compiled.outputFiles[0].text).toString('base64'));
const valid = { name: 'Visitor', email: 'visitor@example.org', message: 'Hello, I have a project.', token: 'test-token' };
const request = (body = valid, headers = {}) => new Request('https://example.com/api/contact', {
  method: 'POST', headers: { Origin: 'https://example.com', 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

await test('contact endpoint', async t => {
  const originalFetch = globalThis.fetch;
  let calls, env;
  function setup({ limited = false, verification = {}, deliveryStatus = 200 } = {}) {
    calls = [];
    env = { TURNSTILE_SITE_KEY: 'public-site-key', CONTACT_ORIGIN: 'https://example.com', TURNSTILE_SECRET_KEY: 'private-token', CONTACT_TO_EMAIL: 'private-recipient@example.org', CONTACT_FROM_EMAIL: 'sender@example.com', RESEND_API_KEY: 'private-api-key', CONTACT_RATE_LIMITER: { limit: async () => ({ success: !limited }) } };
    globalThis.contactTestContext = { env };
    globalThis.fetch = async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return url.includes('siteverify')
        ? Response.json({ success: true, hostname: 'example.com', action: 'contact', ...verification })
        : Response.json({ internal: env.CONTACT_TO_EMAIL }, { status: deliveryStatus });
    };
  }
  try {
    await t.test('runtime config exposes only public site key', async () => {
      setup(); const result = await GET();
      assert.equal(result.status, 200);
      assert.equal(result.headers.get('cache-control'), 'no-store');
      assert.deepEqual(await result.json(), { siteKey: 'public-site-key' });
      env.TURNSTILE_SITE_KEY = 'rotated-public-key';
      assert.deepEqual(await (await GET()).json(), { siteKey: 'rotated-public-key' });
      assert.equal(calls.length, 0);
    });
    await t.test('missing public key returns generic failure', async () => {
      setup(); delete env.TURNSTILE_SITE_KEY; const result = await GET();
      assert.equal(result.status, 503);
      assert.equal(result.headers.get('cache-control'), 'no-store');
      assert.deepEqual(await result.json(), { success: false, error: 'Unable to send message. Please try again later.' });
    });
    await t.test('valid message uses fixed recipient, plain text and visitor Reply-To', async () => {
      setup(); const result = await POST(request({ ...valid, name: ' Visitor ', message: '<b>plain text</b>' }));
      assert.equal(result.status, 200); assert.deepEqual(await result.json(), { success: true });
      assert.equal(result.headers.get('cache-control'), 'no-store');
      assert.equal(calls.length, 2); assert.deepEqual(calls[1].body.to, [env.CONTACT_TO_EMAIL]);
      assert.equal(calls[1].body.reply_to, valid.email); assert.equal(calls[1].body.html, undefined);
      assert.match(calls[1].body.text, /<b>plain text<\/b>/);
    });
    for (const [name, body] of [
      ['malformed JSON', '{'], ['wrong types', { ...valid, name: [] }],
      ['blank message', { ...valid, message: '  ' }], ['oversized field', { ...valid, message: 'a'.repeat(5001) }],
      ['header injection', { ...valid, email: 'a@example.com\r\nBcc: b@example.com' }],
      ['control characters', { ...valid, name: 'a\u0000b' }], ['missing token', { ...valid, token: '' }],
      ['oversized body without Content-Length', { ...valid, padding: 'x'.repeat(32769) }],
    ]) await t.test(name, async () => { setup(); const result = await POST(request(body)); assert.equal(result.status, 400); assert.equal(calls.length, 0); });
    await t.test('oversized Content-Length rejected before external requests', async () => {
      setup();
      const result = await POST(request(valid, { 'Content-Length': '32769' }));
      assert.equal(result.status, 413);
      assert.equal(calls.length, 0);
    });
    await t.test('foreign origin rejected', async () => { setup(); assert.equal((await POST(request(valid, { Origin: 'https://attacker.example' }))).status, 403); assert.equal(calls.length, 0); });
    await t.test('non-JSON rejected', async () => { setup(); assert.equal((await POST(request(valid, { 'Content-Type': 'text/plain' }))).status, 415); });
    await t.test('rate limited before external requests', async () => { setup({ limited: true }); const result = await POST(request()); assert.equal(result.status, 429); assert.equal(result.headers.get('retry-after'), '60'); assert.equal(calls.length, 0); });
    for (const verification of [{ success: false }, { hostname: 'attacker.example' }, { action: 'other' }]) {
      await t.test('invalid verification never sends email ' + JSON.stringify(verification), async () => { setup({ verification }); assert.equal((await POST(request())).status, 400); assert.equal(calls.length, 1); });
    }
    await t.test('provider failure is generic and does not expose recipient', async () => { setup({ deliveryStatus: 422 }); const result = await POST(request()); assert.equal(result.status, 503); assert.ok(!(await result.text()).includes(env.CONTACT_TO_EMAIL)); });
    await t.test('missing secrets fail closed', async () => { setup(); delete env.TURNSTILE_SECRET_KEY; assert.equal((await POST(request())).status, 503); assert.equal(calls.length, 0); });
    await t.test('network failure is generic', async () => { setup(); globalThis.fetch = async () => { throw new Error(env.RESEND_API_KEY); }; const result = await POST(request()); assert.equal(result.status, 503); assert.ok(!(await result.text()).includes(env.RESEND_API_KEY)); });
  } finally { globalThis.fetch = originalFetch; delete globalThis.contactTestContext; }
});
