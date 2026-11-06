import { sectionIds } from '../data/sections.ts';

export function languageHash(hash: string): string {
  const id = hash.slice(1);
  return hash.startsWith('#') && sectionIds.some((section) => section === id) ? hash : '';
}
