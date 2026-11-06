import { englishContent } from './locales/en.ts';
import { frenchContent } from './locales/fr.ts';
import type { Locale, PortfolioContent } from './schema';

const content: Readonly<Record<Locale, PortfolioContent>> = {
  en: englishContent,
  fr: frenchContent,
};

export function getContent(locale: Locale): PortfolioContent {
  return content[locale];
}
