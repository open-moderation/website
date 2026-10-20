export const locales = ['en', 'fr', 'es', 'de', 'it'] as const;
export type Locale = (typeof locales)[number];

export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  es: 'es_ES',
  de: 'de_DE',
  it: 'it_IT',
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
};

type Route = Partial<Record<Locale, string>>;

export const routes: Route[] = [
  { en: '/', fr: '/fr', es: '/es', de: '/de', it: '/it' },
  { en: '/demo', fr: '/fr/tester-la-moderation', es: '/es/probar-moderacion', de: '/de/moderation-testen', it: '/it/prova-moderazione' },
  { en: '/about', fr: '/fr/a-propos', es: '/es/sobre-nosotros', de: '/de/ueber-uns', it: '/it/chi-siamo' },
  { en: '/alternatives', fr: '/fr/alternatives', es: '/es/alternativas', de: '/de/alternativen', it: '/it/alternative' },
  { en: '/alternatives/azure-content-safety', fr: '/fr/alternatives/azure-content-safety', es: '/es/alternativas/azure-content-safety', de: '/de/alternativen/azure-content-safety', it: '/it/alternative/azure-content-safety' },
  { en: '/alternatives/checkstep', fr: '/fr/alternatives/checkstep', es: '/es/alternativas/checkstep', de: '/de/alternativen/checkstep', it: '/it/alternative/checkstep' },
  { en: '/alternatives/hive-moderation', fr: '/fr/alternatives/hive-moderation', es: '/es/alternativas/hive-moderation', de: '/de/alternativen/hive-moderation', it: '/it/alternative/hive-moderation' },
  { en: '/alternatives/mistral-moderation', fr: '/fr/alternatives/mistral-moderation', es: '/es/alternativas/mistral-moderation', de: '/de/alternativen/mistral-moderation', it: '/it/alternative/mistral-moderation' },
  { en: '/alternatives/openai-moderation', fr: '/fr/alternatives/openai-moderation', es: '/es/alternativas/openai-moderation', de: '/de/alternativen/openai-moderation', it: '/it/alternative/openai-moderation' },
  { en: '/alternatives/perspective-api', fr: '/fr/alternatives/perspective-api', es: '/es/alternativas/perspective-api', de: '/de/alternativen/perspective-api', it: '/it/alternative/perspective-api' },
  { en: '/blog', fr: '/fr/blog', es: '/es/blog', de: '/de/blog', it: '/it/blog' },
  { en: '/blog/ai-content-moderation-developer-guide', fr: '/fr/blog/guide-moderation-contenu-ia-developpeurs', es: '/es/blog/guia-moderacion-contenido-ia-desarrolladores', de: '/de/blog/ki-content-moderation-leitfaden-entwickler', it: '/it/blog/guida-moderazione-contenuti-ia-sviluppatori' },
  { en: '/blog/build-vs-buy-moderation', fr: '/fr/blog/moderation-construire-ou-acheter', es: '/es/blog/moderacion-construir-o-comprar', de: '/de/blog/moderation-selbst-bauen-oder-kaufen', it: '/it/blog/moderazione-costruire-o-acquistare' },
  { en: '/blog/dsa-compliance-open-source-moderation', fr: '/fr/blog/conformite-dsa-moderation-open-source', es: '/es/blog/cumplimiento-dsa-moderacion-open-source', de: '/de/blog/dsa-konformitaet-open-source-moderation', it: '/it/blog/conformita-dsa-moderazione-open-source' },
  { en: '/blog/dsa-compliance-sme-guide', fr: '/fr/blog/guide-dsa-pme', es: '/es/blog/guia-dsa-pymes', de: '/de/blog/dsa-leitfaden-kmu', it: '/it/blog/guida-dsa-pmi' },
  { en: '/blog/introducing-open-moderation', fr: '/fr/blog/presentation-openmoderation', es: '/es/blog/presentamos-openmoderation', de: '/de/blog/openmoderation-vorgestellt', it: '/it/blog/presentiamo-openmoderation' },
  { en: '/blog/openai-vs-azure-vs-llama-guard-comparison', fr: '/fr/blog/comparatif-openai-azure-llama-guard', es: '/es/blog/comparativa-openai-azure-llama-guard', de: '/de/blog/vergleich-openai-azure-llama-guard', it: '/it/blog/confronto-openai-azure-llama-guard' },
  { en: '/blog/openai-moderation-api-guide', fr: '/fr/blog/guide-api-openai-moderation', es: '/es/blog/guia-api-openai-moderation', de: '/de/blog/openai-moderation-api-leitfaden', it: '/it/blog/guida-api-openai-moderation' },
  { en: '/blog/perspective-api-migration-guide', fr: '/fr/blog/migration-perspective-api', es: '/es/blog/migracion-perspective-api', de: '/de/blog/perspective-api-migration', it: '/it/blog/migrazione-perspective-api' },
  { en: '/build-vs-buy', fr: '/fr/construire-ou-acheter', es: '/es/construir-o-comprar', de: '/de/selbst-bauen-oder-kaufen', it: '/it/costruire-o-acquistare' },
  { en: '/connectors', fr: '/fr/integrations', es: '/es/integraciones', de: '/de/integrationen', it: '/it/integrazioni' },
  { en: '/content-moderation-api', fr: '/fr/api-moderation-contenu', es: '/es/api-moderacion-contenido', de: '/de/content-moderation-api', it: '/it/api-moderazione-contenuti' },
  { en: '/dashboard', fr: '/fr/console-de-moderation', es: '/es/consola-de-moderacion', de: '/de/moderationskonsole', it: '/it/console-di-moderazione' },
  { en: '/dsa-compliance', fr: '/fr/conformite-dsa', es: '/es/cumplimiento-dsa', de: '/de/dsa-konformitaet', it: '/it/conformita-dsa' },
  { en: '/faq', fr: '/fr/faq', es: '/es/preguntas-frecuentes', de: '/de/faq', it: '/it/faq' },
  { en: '/features', fr: '/fr/fonctionnalites', es: '/es/funcionalidades', de: '/de/funktionen', it: '/it/funzionalita' },
  { en: '/how-it-works', fr: '/fr/comment-ca-marche', es: '/es/como-funciona', de: '/de/so-funktioniert-es', it: '/it/come-funziona' },
  { en: '/integrations/facebook', fr: '/fr/integrations/moderation-facebook', es: '/es/integraciones/moderacion-facebook', de: '/de/integrationen/facebook-moderation', it: '/it/integrazioni/moderazione-facebook' },
  { en: '/integrations/instagram', fr: '/fr/integrations/moderation-instagram', es: '/es/integraciones/moderacion-instagram', de: '/de/integrationen/instagram-moderation', it: '/it/integrazioni/moderazione-instagram' },
  { en: '/integrations/wordpress', fr: '/fr/integrations/moderation-wordpress', es: '/es/integraciones/moderacion-wordpress', de: '/de/integrationen/wordpress-moderation', it: '/it/integrazioni/moderazione-wordpress' },
  { en: '/integrations/youtube', fr: '/fr/integrations/moderation-youtube', es: '/es/integraciones/moderacion-youtube', de: '/de/integrationen/youtube-moderation', it: '/it/integrazioni/moderazione-youtube' },
  { en: '/pricing', fr: '/fr/tarifs', es: '/es/precios', de: '/de/preise', it: '/it/prezzi' },
  { en: '/privacy', fr: '/fr/confidentialite', es: '/es/privacidad', de: '/de/datenschutz', it: '/it/privacy' },
  { en: '/product/transparency', fr: '/fr/produit/transparence', es: '/es/producto/transparencia', de: '/de/produkt/transparenz', it: '/it/prodotto/trasparenza' },
  { en: '/terms', fr: '/fr/conditions', es: '/es/condiciones', de: '/de/nutzungsbedingungen', it: '/it/termini' },
  { en: '/text-moderation-api', fr: '/fr/api-moderation-texte', es: '/es/api-moderacion-texto', de: '/de/text-moderation-api', it: '/it/api-moderazione-testo' },
  { en: '/use-cases', fr: '/fr/cas-usage', es: '/es/casos-de-uso', de: '/de/anwendungsfaelle', it: '/it/casi-d-uso' },
  { en: '/use-cases/ai-applications', fr: '/fr/cas-usage/applications-ia', es: '/es/casos-de-uso/aplicaciones-ia', de: '/de/anwendungsfaelle/ki-anwendungen', it: '/it/casi-d-uso/applicazioni-ia' },
  { en: '/use-cases/enterprise-saas', fr: '/fr/cas-usage/saas-entreprise', es: '/es/casos-de-uso/saas-empresarial', de: '/de/anwendungsfaelle/enterprise-saas', it: '/it/casi-d-uso/saas-aziendale' },
  { en: '/use-cases/gaming', fr: '/fr/cas-usage/jeux-video', es: '/es/casos-de-uso/videojuegos', de: '/de/anwendungsfaelle/gaming', it: '/it/casi-d-uso/videogiochi' },
  { en: '/use-cases/marketplaces', fr: '/fr/cas-usage/marketplaces', es: '/es/casos-de-uso/marketplaces', de: '/de/anwendungsfaelle/marktplaetze', it: '/it/casi-d-uso/marketplace' },
  { en: '/use-cases/news-publishers', fr: '/fr/cas-usage/medias', es: '/es/casos-de-uso/medios', de: '/de/anwendungsfaelle/medien', it: '/it/casi-d-uso/media' },
  { en: '/use-cases/social-platforms', fr: '/fr/cas-usage/plateformes-sociales', es: '/es/casos-de-uso/plataformas-sociales', de: '/de/anwendungsfaelle/soziale-plattformen', it: '/it/casi-d-uso/piattaforme-social' },
  { en: '/alternatives/bodyguard', fr: '/fr/alternatives/bodyguard', es: '/es/alternativas/bodyguard', de: '/de/alternativen/bodyguard', it: '/it/alternative/bodyguard' },
  { fr: '/fr/alternatives/netino', es: '/es/alternativas/netino' },
  { en: '/alternatives/conversario', de: '/de/alternativen/conversario' },
  { en: '/alternatives/utopia', fr: '/fr/alternatives/utopia', de: '/de/alternativen/utopia' },
  { en: '/alternatives/trollwall', de: '/de/alternativen/trollwall' },
  { en: '/alternatives/swat-io', de: '/de/alternativen/swat-io' },
  { en: '/alternatives/fanpage-karma', de: '/de/alternativen/fanpage-karma' },
  { en: '/alternatives/interactora', es: '/es/alternativas/interactora' },
  { en: '/alternatives/digitaller', es: '/es/alternativas/digitaller' },
  { en: '/alternatives/comments-news', es: '/es/alternativas/comments-news' },
  { en: '/alternatives/viafoura', fr: '/fr/alternatives/viafoura', es: '/es/alternativas/viafoura', de: '/de/alternativen/viafoura', it: '/it/alternative/viafoura' },
  { en: '/alternatives/napoleoncat', fr: '/fr/alternatives/napoleoncat', es: '/es/alternativas/napoleoncat', de: '/de/alternativen/napoleoncat', it: '/it/alternative/napoleoncat' },
  { en: '/alternatives/coral', fr: '/fr/alternatives/coral', de: '/de/alternativen/coral' },
  { en: '/alternatives/openweb', fr: '/fr/alternatives/openweb', de: '/de/alternativen/openweb' },
  { en: '/alternatives/besedo', fr: '/fr/alternatives/besedo', it: '/it/alternative/besedo' },
  { en: '/alternatives/lasso-moderation', de: '/de/alternativen/lasso-moderation' },
  { en: '/alternatives/respondology' },
  { en: '/alternatives/arwen' },
  { en: '/social-media-moderation', fr: '/fr/moderation-reseaux-sociaux', es: '/es/moderacion-redes-sociales', de: '/de/social-media-moderation', it: '/it/moderazione-social' },
  { en: '/dsa-compliance/statement-of-reasons', fr: '/fr/conformite-dsa/expose-des-motifs', es: '/es/cumplimiento-dsa/declaracion-de-motivos', de: '/de/dsa-konformitaet/begruendung', it: '/it/conformita-dsa/motivazione' },
  { en: '/content-moderation-policy', fr: '/fr/charte-de-moderation', es: '/es/politica-de-moderacion', de: '/de/moderationsrichtlinien', it: '/it/policy-di-moderazione' },
];

const trim = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path);

const findRoute = (path: string) => {
  const clean = trim(path);
  return routes.find((r) => Object.values(r).includes(clean));
};

export function getLocale(pathname: string): Locale {
  const segment = pathname.split('/')[1] as Locale;
  return (locales as readonly string[]).includes(segment) && segment !== 'en' ? segment : 'en';
}

export function localizePath(path: string, locale: Locale): string {
  const [base, hash] = path.split('#');
  const target = findRoute(base)?.[locale] ?? base;
  return hash ? `${target}#${hash}` : target;
}

export function getAlternates(pathname: string): Route {
  return findRoute(pathname) ?? { [getLocale(pathname)]: trim(pathname) };
}
