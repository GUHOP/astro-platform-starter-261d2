# Base44 Setup Notes

## Project
Astro 7 + React + Tailwind 4 site (Netlify platform starter). Uses Netlify Blobs, Edge Functions, and cache-purge APIs.

## Sandbox Overrides
- **Netlify adapter omitted in preview mode.** `astro.config.mjs` checks `BASE44_PREVIEW_MODE === '1'` and skips the `@astrojs/netlify` adapter. The adapter's edge-functions dev server requires Deno, which cannot run in the sandbox; omitting it lets the Astro dev server boot. All regular pages render. The `/edge` geo-redirect and Netlify Blobs features do not work in the sandbox. Original behavior is preserved when the flag is unset.
- **Uploads disabled.** `PUBLIC_DISABLE_UPLOADS=true` is set in compose so the blobs POST endpoint doesn't attempt Netlify Blob writes.

## Running
- `docker compose -f docker-compose.base44.yml up -d` — starts Astro dev server on port 4321, mapped to host port 3000.
- Dependencies install on container startup via `npm install`.
- Live reload is active (Astro dev server watches source files).

## Verification
- All page routes return 200: `/`, `/image-cdn`, `/revalidation`, `/blobs`, `/edge`.
- Healthcheck probes `http://localhost:4321/`.
