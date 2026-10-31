import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.openmoderation.com',
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'de', 'it', 'pt', 'pl', 'nl'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  build: { inlineStylesheets: 'always' },
  trailingSlash: 'never'
});