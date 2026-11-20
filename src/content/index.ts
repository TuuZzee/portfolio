import { englishContent } from './locales/en.ts';
import { frenchContent } from './locales/fr.ts';
import { koreanContent } from './locales/ko.ts';
import type { Locale, PortfolioContent } from './schema';

const content: Readonly<Record<Locale, PortfolioContent>> = {
  en: englishContent,
  fr: frenchContent,
  ko: koreanContent,
};

export function getContent(locale: Locale): PortfolioContent {
  return content[locale];
}
