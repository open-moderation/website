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
    locales: ['en', 'fr', 'es', 'de', 'it'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({
    serialize(item) {
      item.lastmod = new Date().toISOString().split('T')[0];
      return item;
    },
  })],
  trailingSlash: 'never'
});