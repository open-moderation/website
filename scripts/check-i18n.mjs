import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { routes, locales, getLocale } from '../src/i18n/routes.ts';

const dist = process.argv[2] ?? 'dist';
const errors = [];
const warnings = [];

const fileFor = (path) => (path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html'));

for (const route of routes) {
  const single = Object.keys(route).length < 4;
  for (const locale of locales) {
    const path = route[locale];
    if (!path) {
      if (!single) warnings.push(`no ${locale} route for ${Object.values(route)[0]}`);
    }
    else if (!existsSync(fileFor(path))) errors.push(`missing page ${path}`);
  }
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith('.html') ? [full] : [];
  });

for (const file of walk(dist)) {
  const pagePath = '/' + file.slice(dist.length + 1).replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
  const locale = getLocale(pagePath);
  const html = readFileSync(file, 'utf8');
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  if (lang !== locale) errors.push(`${pagePath}: <html lang="${lang}"> but expected ${locale}`);
  for (const [tag, href] of html.matchAll(/<a[^>]*?href="(\/[^"#?]*)[^>]*>/g)) {
    const target = href.length > 1 ? href.replace(/\/$/, '') : href;
    if (/\.(svg|png|jpg|txt|xml)$/.test(target)) continue;
    if (!existsSync(fileFor(target)) && !existsSync(join(dist, `${target}.html`))) {
      errors.push(`${pagePath}: broken link ${href}`);
    } else if (getLocale(target) !== locale && !tag.includes('hreflang=')) {
      errors.push(`${pagePath}: links to ${href} (${getLocale(target)}) from a ${locale} page`);
    }
  }
}

warnings.forEach((w) => console.warn(`warn  ${w}`));
errors.forEach((e) => console.error(`error ${e}`));
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
