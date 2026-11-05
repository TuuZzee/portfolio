import { en } from '../content/locales/en';

export const sectionIds = [
  'about',
  'work',
  'experience',
  'skills',
  'education',
  'contact',
] as const;
export type SectionId = (typeof sectionIds)[number];

export const sections = sectionIds.map((id) => ({ id, ...en.sections[id] }));
