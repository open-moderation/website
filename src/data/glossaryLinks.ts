// Liens automatiques vers le lexique : la première occurrence de chaque terme (ou de son sigle entre
// parenthèses, ex. « DSA », « LLM ») dans le corps d'un article est reliée à sa définition.
// Jamais dans un titre, un lien, du code, un bouton ; au plus `max` liens par article.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { glossaryBase, glossaryTerms } from './glossary';
import { routes } from '../i18n/routes';

const BLOCKED = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'script', 'style', 'button', 'time', 'svg', 'summary', 'label', 'nav', 'header', 'footer', 'figcaption', 'textarea', 'select', 'kbd']);
const ALLOWED = new Set(['p', 'li', 'td', 'dd', 'blockquote']);
const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link', 'source', 'wbr', 'area', 'col', 'embed', 'track', 'path', 'circle', 'rect', 'line', 'polyline']);
// Pluriels simples par langue (le sigle et le terme gardent ainsi leur forme la plus courante).
const SUFFIX: Record<string, string> = { en: '(?:s|es)?', fr: '(?:s|x)?', es: '(?:s|es)?', pt: '(?:s|es)?', nl: '(?:s|en)?', de: '(?:e|en|n|s|es)?', it: '', pl: '' };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const toPattern = (s: string) =>
  escape(s)
    .replace(/['’]/g, "(?:'|’|&#39;|&#x27;|&apos;)")
    .replace(/&/g, '(?:&|&amp;)')
    .replace(/ /g, '(?:\\s|&nbsp;|\\u00a0)+');

type Matcher = { id: string; href: string; short: string; re: RegExp };
const cache = new Map<string, Matcher[]>();

export function glossaryMatchers(locale: string): Matcher[] {
  if (cache.has(locale)) return cache.get(locale)!;
  const base = glossaryBase[locale];
  const out = glossaryTerms(locale).map((t) => {
    const forms = new Set<string>();
    const m = t.term.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if (m) { forms.add(m[1].trim()); forms.add(m[2].trim()); } else forms.add(t.term.trim());
    const list = [...forms].filter((f) => f.length >= 3).sort((a, b) => b.length - a.length);
    const re = new RegExp(`(?<![\\p{L}\\p{N}_-])(?:${list.map(toPattern).join('|')})${SUFFIX[locale] ?? ''}(?![\\p{L}\\p{N}_-])`, 'iu');
    return { id: t.id, href: `${base}/${t.slug}`, short: t.short, re };
  });
  cache.set(locale, out);
  return out;
}

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

type Walk = (text: string) => string;
// Parcourt le HTML et applique `fn` aux seuls textes autorisés (paragraphes, listes, cellules, hors titres/liens/code).
function walkText(html: string, fn: Walk): string {
  const tokens = html.split(/(<!--[\s\S]*?-->|<[^>]+>)/);
  let blocked = 0;
  let allowed = 0;
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (!tok) continue;
    if (tok.startsWith('<')) {
      const m = tok.match(/^<(\/?)([a-zA-Z][\w-]*)/);
      if (!m) continue;
      const name = m[2].toLowerCase();
      if (VOID.has(name) || tok.endsWith('/>')) continue;
      const d = m[1] === '/' ? -1 : 1;
      if (BLOCKED.has(name)) blocked = Math.max(0, blocked + d);
      else if (ALLOWED.has(name)) allowed = Math.max(0, allowed + d);
      continue;
    }
    if (blocked === 0 && allowed > 0) tokens[i] = fn(tok);
  }
  return tokens.join('');
}

/** Nombre d'occurrences de chaque terme dans le texte autorisé. */
export function scanGlossary(html: string, locale: string): Record<string, number> {
  const counts: Record<string, number> = {};
  const matchers = glossaryMatchers(locale);
  walkText(html, (tok) => {
    for (const m of matchers) {
      const n = tok.match(new RegExp(m.re.source, 'giu'))?.length ?? 0;
      if (n) counts[m.id] = (counts[m.id] ?? 0) + n;
    }
    return tok;
  });
  return counts;
}

/** Choisit les termes à relier : les plus spécifiques d'abord (employés par le moins d'articles de la langue). */
function chooseTerms(counts: Record<string, number>, locale: string, max: number, exclude: Set<string>): string[] {
  const df = docFreq(locale);
  return Object.keys(counts)
    .filter((id) => !exclude.has(id))
    .sort((a, b) => (df[a] ?? 0) - (df[b] ?? 0) || counts[b] - counts[a])
    .slice(0, max);
}

export function linkifyGlossary(html: string, locale: string, max = 5): { html: string; linked: string[] } {
  const all = glossaryMatchers(locale);
  const exclude = new Set(all.filter((m) => html.includes(`href="${m.href}"`)).map((m) => m.id));
  const chosen = new Set(chooseTerms(scanGlossary(html, locale), locale, max, exclude));
  const matchers = all.filter((m) => chosen.has(m.id));
  const linked: string[] = [];
  const out = walkText(html, (tok) => {
    let text = tok;
    let res = '';
    for (;;) {
      let best: { m: Matcher; index: number; len: number } | null = null;
      for (const m of matchers) {
        if (linked.includes(m.id)) continue;
        const r = m.re.exec(text);
        if (r && (!best || r.index < best.index || (r.index === best.index && r[0].length > best.len))) best = { m, index: r.index, len: r[0].length };
      }
      if (!best) break;
      const word = text.slice(best.index, best.index + best.len);
      res += `${text.slice(0, best.index)}<a href="${best.m.href}" class="om-glossary-link" title="${attr(best.m.short)}">${word}</a>`;
      text = text.slice(best.index + best.len);
      linked.push(best.m.id);
    }
    return res + text;
  });
  return { html: out, linked };
}

// ---------- Retour du lexique vers les articles qui emploient le terme ----------
type Usage = { url: string; slug: string; counts: Record<string, number>; exclude: Set<string> };
const usageCache = new Map<string, Usage[]>();
const dfCache = new Map<string, Record<string, number>>();

function articleUsage(locale: string): Usage[] {
  if (usageCache.has(locale)) return usageCache.get(locale)!;
  const out: Usage[] = [];
  const all = glossaryMatchers(locale);
  for (const r of routes) {
    const url = r[locale as keyof typeof r];
    if (!r.en || !/^\/blog\/.+/.test(r.en) || !url) continue;
    const file = join(process.cwd(), 'src/pages', `${url}.astro`);
    if (!existsSync(file)) continue;
    const src = readFileSync(file, 'utf8');
    const body = src.slice(src.indexOf('<article'), src.lastIndexOf('</article>'));
    const exclude = new Set(all.filter((m) => body.includes(`href="${m.href}"`)).map((m) => m.id));
    out.push({ url, slug: r.en.replace('/blog/', ''), counts: scanGlossary(body, locale), exclude });
  }
  usageCache.set(locale, out);
  return out;
}

function docFreq(locale: string): Record<string, number> {
  if (dfCache.has(locale)) return dfCache.get(locale)!;
  const df: Record<string, number> = {};
  for (const u of articleUsage(locale)) for (const id of Object.keys(u.counts)) df[id] = (df[id] ?? 0) + 1;
  dfCache.set(locale, df);
  return df;
}

/** Les 2 ou 3 articles de la même langue qui emploient le plus le terme (ceux qui y renvoient d'abord). */
export function articlesUsingTerm(locale: string, id: string, max = 3): string[] {
  const linksTo = (u: Usage) => Number(chooseTerms(u.counts, locale, 5, u.exclude).includes(id));
  return articleUsage(locale)
    .filter((u) => (u.counts[id] ?? 0) > 0)
    .sort((a, b) => linksTo(b) - linksTo(a) || (b.counts[id] ?? 0) - (a.counts[id] ?? 0))
    .slice(0, max)
    .map((u) => u.slug);
}
