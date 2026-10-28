# Contact form setup

The homepage and About page open the same native dialog. The recipient is read only by POST /api/contact from a Worker secret. No address is embedded in frontend code or sent back in API responses. No new runtime dependency is required.

## Configuration

| Name | Where | Value |
| --- | --- | --- |
| TURNSTILE_SITE_KEY | wrangler.toml vars / Cloudflare runtime variable (Text) | Public site key, synchronized with the dashboard |
| TURNSTILE_SECRET_KEY | Cloudflare Worker secret | Matching private Turnstile secret |
| CONTACT_TO_EMAIL | Cloudflare Worker secret | Your destination mailbox |
| CONTACT_FROM_EMAIL | Cloudflare Worker secret | Sender address on a domain verified in Resend |
| RESEND_API_KEY | Cloudflare Worker secret | Resend API key with sending permission |
| CONTACT_ORIGIN | wrangler.toml vars | https://lonut.dev (already configured) |
| CONTACT_RATE_LIMITER | wrangler.toml binding | Already configured: five attempts per minute per IP, per Cloudflare location |

The dialog fetches GET /api/contact when opened. This endpoint reads TURNSTILE_SITE_KEY from the Worker environment and returns only the public site key, with no-store caching. Secrets and the destination mailbox are never included. No GitHub build variable or NEXT_PUBLIC_ setting is needed. Both GitHub deployment and bun run deploy use the same Cloudflare runtime configuration.

In Cloudflare, open Workers & Pages > portfolio > Settings > Variables and Secrets. Add TURNSTILE_SITE_KEY with type Text, then save/deploy the configuration. It belongs to the Worker runtime, not Build variables. Once this code is deployed, key changes require applying the Worker configuration but no frontend rebuild. wrangler.toml sets keep_vars = true so deployments preserve dashboard variables. Existing values explicitly defined in wrangler.toml remain managed by that file. TURNSTILE_SITE_KEY is now synchronized in wrangler.toml at your request. When rotating it in the dashboard, also update this public value in wrangler.toml; otherwise the next deployment restores the configured value. Never add TURNSTILE_SECRET_KEY to that file.

Create a managed Turnstile widget for lonut.dev in the Cloudflare dashboard. The backend verifies its hostname and the contact action. Configure your sending domain in Resend and complete its DNS verification. The visitor address is Reply-To, never From. There is no auto-reply to the visitor.

Set each secret using the interactive prompt (do not put values on the command line):

~~~sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put CONTACT_TO_EMAIL
npx wrangler secret put CONTACT_FROM_EMAIL
npx wrangler secret put RESEND_API_KEY
~~~

The rate limit namespace 1001001 must be unique within your Cloudflare account; change it if already used by another service. IP quotas can affect visitors sharing a network and are local to each Cloudflare location, not an exact global quota. Missing configuration or unavailable protection fails closed.

## Local development

For local development, provide TURNSTILE_SITE_KEY and the server values above, including CONTACT_ORIGIN=http://localhost:3000, through local bindings. Local development does not download production secrets. Use a separate development widget allowing localhost; production hostname validation is deliberately not bypassed for dummy tokens. Local requests without a Cloudflare IP share a single development quota. For delivery tests, use a mailbox you control and a verified sender.

## Validation

Run npm run build and npm run cloudflare:build. Search .next/static, generated HTML/RSC files in .next/server/app, .open-next/assets, .open-next/cache and public assets for the destination mailbox. A clean rebuild is required to discard old cached bundles. Check the public resume's extracted text, annotations and metadata separately.

Run node --test tests/contact.test.mjs for mocked endpoint security and error handling checks. These do not send email. Verify the real widget and delivery after configuring the services: open the dialog, submit, confirm receipt, then check rejected/expired tokens, rate limits, generic responses, keyboard navigation and mobile sizing.

The API validates field types and lengths, rejects control characters, limits actual request bytes, checks the request origin, verifies Turnstile before delivery, and returns only generic responses with no-store. Messages are sent as plain text; provider error bodies are never returned or logged.

Hiding an address prevents new exposure through this frontend. It does not erase historical copies or replace SPF, DKIM and DMARC for sender authentication.
