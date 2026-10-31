// Compte les liens internes contextuels entrants par page (hors <header>, <nav>, <footer>) sur dist.
// Usage : node scripts/measure-inlinks.mjs [dist] [--json]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { routes } from '../src/i18n/routes.ts';

const dist = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'dist';
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith('.html') ? [full] : [];
  });
const norm = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p);

const enOf = new Map();
for (const r of routes) for (const p of Object.values(r)) enOf.set(p, r.en);

const type = (page) => {
  const en = enOf.get(page) ?? '';
  if (/^\/use-cases\/.+/.test(en)) return 'use-case';
  if (/^\/blog\/.+/.test(en)) return 'blog article';
  if (en === '/demo') return 'demo';
  if (/^\/glossary\/.+/.test(en)) return 'glossary term';
  if (/^\/alternatives\/.+/.test(en)) return 'comparison';
  return null;
};

const inlinks = new Map();
const pages = [];
for (const file of walk(dist)) {
  const page = norm('/' + file.slice(dist.length + 1).replace(/(^|\/)index\.html$/, '').replace(/\.html$/, ''));
  pages.push(page);
  const html = readFileSync(file, 'utf8')
    .replace(/<(header|nav|footer)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/g, '');
  const targets = new Set();
  for (const [, href] of html.matchAll(/<a\b[^>]*?href="(\/[^"#?]*)/g)) targets.add(norm(href));
  targets.delete(page);
  for (const t of targets) inlinks.set(t, (inlinks.get(t) ?? 0) + 1);
}

const stats = {};
for (const page of pages) {
  const t = type(page);
  if (!t) continue;
  (stats[t] ??= []).push([page, inlinks.get(page) ?? 0]);
}
const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const out = {};
for (const [t, list] of Object.entries(stats)) {
  const n = list.map(([, c]) => c);
  out[t] = { pages: n.length, min: Math.min(...n), median: median(n), mean: +(n.reduce((a, b) => a + b, 0) / n.length).toFixed(1), max: Math.max(...n), under3: n.filter((c) => c < 3).length, under8: n.filter((c) => c < 8).length, under60: n.filter((c) => c < 60).length };
}
if (process.argv.includes('--json')) console.log(JSON.stringify(out, null, 2));
else console.table(out);
if (process.argv.includes('--list')) for (const [t, list] of Object.entries(stats)) for (const [p, c] of list.sort((a, b) => a[1] - b[1]).slice(0, 10)) console.log(t, c, p);
