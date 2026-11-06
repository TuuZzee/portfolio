export const sectionIds = [
  'about',
  'work',
  'experience',
  'skills',
  'education',
  'contact',
] as const;
export type SectionId = (typeof sectionIds)[number];
