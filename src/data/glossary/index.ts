// Données du lexique par langue. Chaque fichier <locale>.json contient la liste des termes.
import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import de from './de.json';
import it from './it.json';
import pt from './pt.json';
import pl from './pl.json';
import nl from './nl.json';

export interface GlossaryTerm {
  id: string;
  slug: string;
  term: string;
  title?: string;
  description?: string;
  h1?: string;
  short: string;
  body: string[];
  related: Array<{ label: string; href: string }>;
  see: string[];
}

const data: Record<string, GlossaryTerm[]> = { en, fr, es, de, it, pt, pl, nl } as Record<string, GlossaryTerm[]>;

export const glossaryBase: Record<string, string> = {
  en: '/glossary', fr: '/fr/lexique', es: '/es/glosario', de: '/de/glossar', it: '/it/glossario', pt: '/pt/glossario', pl: '/pl/slownik', nl: '/nl/woordenlijst',
};

export const glossaryTerms = (locale: string): GlossaryTerm[] => data[locale] ?? [];
