import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const inBase44Preview = process.env.BASE44_PREVIEW_MODE === '1';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [react()],
    // In the Base44 sandbox, the Netlify adapter tries to start a Deno-based Edge Functions dev
    // server that cannot run here, blocking the dev server. Omit the adapter in preview mode;
    // all regular pages render fine without it. Original behavior is preserved when the flag is unset.
    ...(inBase44Preview
        ? {}
        : {
              adapter: netlify({
                  devFeatures: {
                      environmentVariables: true
                  }
              })
          })
});
