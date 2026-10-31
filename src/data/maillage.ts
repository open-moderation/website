// Maillage interne : articles du blog (titres par langue, mots-clés), cas d'usage, et correspondances
// entre pages (articles ↔ cas d'usage, comparatifs ↔ articles, pages secteur ↔ articles).
import articlesData from './articles.json';

type Entry = { title: string; description: string };
const articles = articlesData as Record<string, Record<string, Entry>>;

export const articleEntry = (locale: string, slug: string): Entry | undefined => articles[locale]?.[slug] ?? articles.en[slug];

/** Mots-clés de chaque article (slug anglais) : servent à choisir les articles proches. */
export const articleTags: Record<string, string[]> = {
  'ai-content-moderation-developer-guide': ['api', 'developer', 'ai', 'llm'],
  'build-vs-buy-moderation': ['cost', 'developer', 'api', 'team'],
  'dsa-compliance-open-source-moderation': ['dsa', 'compliance', 'comments', 'transparency'],
  'dsa-compliance-sme-guide': ['dsa', 'compliance', 'platform', 'transparency'],
  'introducing-open-moderation': ['product', 'ai', 'api', 'transparency'],
  'openai-vs-azure-vs-llama-guard-comparison': ['api', 'ai', 'llm', 'comparison'],
  'comment-moderation-guide': ['comments', 'community', 'dsa', 'compliance'],
  'hide-facebook-comments-automatically': ['social', 'facebook', 'comments', 'brand'],
  'instagram-comment-moderation': ['social', 'instagram', 'comments', 'brand'],
  'tiktok-comment-moderation': ['social', 'tiktok', 'brand', 'crisis'],
  'social-media-moderation-guide': ['social', 'guide', 'brand', 'crisis'],
  'youtube-comment-moderation': ['social', 'youtube', 'comments', 'trolls'],
  'handle-negative-comments-trolls': ['community', 'trolls', 'crisis', 'brand'],
  'what-is-content-moderation': ['guide', 'dsa', 'compliance', 'team'],
  'openai-moderation-api-guide': ['api', 'llm', 'comparison', 'developer'],
  'perspective-api-migration-guide': ['api', 'comments', 'community', 'comparison'],
};

/** Les 3 ou 4 articles les plus proches (mots-clés partagés), en évitant de toujours renvoyer vers les mêmes. */
export function relatedArticles(slug: string, count = 4): string[] {
  const own = articleTags[slug] ?? [];
  const order = Object.keys(articleTags);
  return order
    .filter((s) => s !== slug)
    .map((s) => ({ s, score: articleTags[s].filter((t) => own.includes(t)).length, i: (order.indexOf(s) - order.indexOf(slug) + order.length) % order.length }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, count)
    .map((x) => x.s);
}

export const useCaseKeys = ['ai-applications', 'enterprise-saas', 'gaming', 'marketplaces', 'news-publishers', 'social-platforms', 'brands-retail', 'luxury-fashion', 'public-sector'] as const;

export const useCaseLabels: Record<string, Record<string, string>> = {
  'ai-applications': { en: 'AI applications', fr: "Applications d'IA", es: 'Aplicaciones de IA', de: 'KI-Anwendungen', it: 'Applicazioni di IA', pt: 'Aplicações de IA', pl: 'Aplikacje AI', nl: 'AI-toepassingen' },
  'enterprise-saas': { en: 'Enterprise SaaS', fr: "SaaS d'entreprise", es: 'SaaS empresarial', de: 'Enterprise-SaaS', it: 'SaaS aziendale', pt: 'SaaS corporativo', pl: 'SaaS dla firm', nl: 'Enterprise SaaS' },
  gaming: { en: 'Gaming', fr: 'Jeux vidéo', es: 'Videojuegos', de: 'Gaming', it: 'Videogiochi', pt: 'Games', pl: 'Gry', nl: 'Gaming' },
  marketplaces: { en: 'Marketplaces', fr: 'Marketplaces', es: 'Marketplaces', de: 'Marktplätze', it: 'Marketplace', pt: 'Marketplaces', pl: "Marketplace'y", nl: 'Marktplaatsen' },
  'news-publishers': { en: 'News publishers', fr: 'Médias', es: 'Medios de comunicación', de: 'Medienhäuser', it: 'Editori e media', pt: 'Mídia', pl: 'Media i wydawcy', nl: 'Nieuwsmedia' },
  'social-platforms': { en: 'Social platforms', fr: 'Plateformes sociales', es: 'Plataformas sociales', de: 'Soziale Plattformen', it: 'Piattaforme social', pt: 'Plataformas sociais', pl: 'Platformy społecznościowe', nl: 'Sociale platforms' },
  'brands-retail': { en: 'Brands & retail', fr: 'Marques et retail', es: 'Marcas y retail', de: 'Marken und Handel', it: 'Brand e retail', pt: 'Marcas e varejo', pl: 'Marki i handel', nl: 'Merken en retail' },
  'luxury-fashion': { en: 'Luxury & fashion', fr: 'Luxe et mode', es: 'Lujo y moda', de: 'Luxus und Mode', it: 'Lusso e moda', pt: 'Luxo e moda', pl: 'Luksus i moda', nl: 'Luxe en mode' },
  'public-sector': { en: 'Public sector', fr: 'Collectivités et institutions', es: 'Sector público e instituciones', de: 'Öffentlicher Sektor', it: 'Pubblica amministrazione', pt: 'Setor público', pl: 'Sektor publiczny', nl: 'Publieke sector' },
};

/** Cas d'usage liés à chaque article. */
export const articleUseCases: Record<string, string[]> = {
  'ai-content-moderation-developer-guide': ['ai-applications', 'enterprise-saas', 'social-platforms'],
  'build-vs-buy-moderation': ['enterprise-saas', 'marketplaces', 'social-platforms'],
  'dsa-compliance-open-source-moderation': ['news-publishers', 'public-sector', 'marketplaces'],
  'dsa-compliance-sme-guide': ['marketplaces', 'social-platforms', 'public-sector'],
  'introducing-open-moderation': ['ai-applications', 'news-publishers', 'brands-retail'],
  'openai-vs-azure-vs-llama-guard-comparison': ['ai-applications', 'enterprise-saas', 'gaming'],
  'comment-moderation-guide': ['news-publishers', 'public-sector', 'brands-retail'],
  'hide-facebook-comments-automatically': ['brands-retail', 'public-sector', 'news-publishers'],
  'instagram-comment-moderation': ['brands-retail', 'luxury-fashion', 'public-sector'],
  'tiktok-comment-moderation': ['brands-retail', 'luxury-fashion', 'news-publishers'],
  'social-media-moderation-guide': ['brands-retail', 'public-sector', 'luxury-fashion'],
  'youtube-comment-moderation': ['news-publishers', 'brands-retail', 'gaming'],
  'handle-negative-comments-trolls': ['gaming', 'brands-retail', 'public-sector'],
  'what-is-content-moderation': ['social-platforms', 'marketplaces', 'news-publishers'],
  'openai-moderation-api-guide': ['ai-applications', 'gaming', 'marketplaces'],
  'perspective-api-migration-guide': ['news-publishers', 'social-platforms', 'gaming'],
};

/** Familles de comparatifs (voir RelatedComparisons) → cas d'usage et articles à suggérer. */
export const comparisonFamilies = [
  { useCases: ['brands-retail', 'luxury-fashion', 'news-publishers', 'public-sector'], articles: ['hide-facebook-comments-automatically', 'youtube-comment-moderation', 'social-media-moderation-guide'] },
  { useCases: ['news-publishers', 'public-sector', 'social-platforms', 'brands-retail'], articles: ['comment-moderation-guide', 'perspective-api-migration-guide', 'dsa-compliance-open-source-moderation'] },
  { useCases: ['ai-applications', 'enterprise-saas', 'marketplaces', 'gaming'], articles: ['openai-moderation-api-guide', 'openai-vs-azure-vs-llama-guard-comparison', 'ai-content-moderation-developer-guide'] },
  { useCases: ['marketplaces', 'social-platforms', 'gaming', 'enterprise-saas'], articles: ['dsa-compliance-sme-guide', 'what-is-content-moderation', 'build-vs-buy-moderation'] },
];

/** Pages secteur / guides (SectorPage), par chemin anglais → articles à suggérer. */
export const sectorArticles: Record<string, string[]> = {
  '/moderation-software': ['what-is-content-moderation', 'build-vs-buy-moderation', 'comment-moderation-guide'],
  '/automatic-comment-moderation': ['comment-moderation-guide', 'hide-facebook-comments-automatically', 'handle-negative-comments-trolls'],
  '/outsourced-moderation': ['build-vs-buy-moderation', 'social-media-moderation-guide', 'handle-negative-comments-trolls'],
  '/dsa-compliance/notice-and-action': ['dsa-compliance-sme-guide', 'dsa-compliance-open-source-moderation', 'what-is-content-moderation'],
  '/use-cases/public-sector': ['social-media-moderation-guide', 'handle-negative-comments-trolls', 'dsa-compliance-sme-guide'],
  '/use-cases/luxury-fashion': ['instagram-comment-moderation', 'tiktok-comment-moderation', 'handle-negative-comments-trolls'],
  '/use-cases/brands-retail': ['hide-facebook-comments-automatically', 'instagram-comment-moderation', 'social-media-moderation-guide'],
};
