import type { EducationFact, ExperienceFact } from './schema';

export const locations = {
  seoul: 'Seoul, South Korea',
  france: 'France',
  toulouseParis: 'Toulouse/Paris, France',
} as const;
export type Location = (typeof locations)[keyof typeof locations];

export const technologies = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  react: 'React',
  next: 'Next.js',
  redux: 'Redux Toolkit',
  rtk: 'RTK Query',
  tailwind: 'Tailwind CSS',
  storybook: 'Storybook',
  chromatic: 'Chromatic',
  actions: 'GitHub Actions',
  cicd: 'CI/CD',
  playwright: 'Playwright',
  jest: 'Jest',
  testingLibrary: 'React Testing Library',
  node: 'Node.js',
  python: 'Python',
  fastapi: 'FastAPI',
  sql: 'SQL/PostgreSQL',
  aws: 'AWS',
  cloudflare: 'Cloudflare',
  docker: 'Docker',
  vercel: 'Vercel',
  sentry: 'Sentry',
} as const;

export const profile = {
  name: 'Guillaume Becker',
  location: locations.seoul,
} as const;

export const publicLinks = {
  linkedin: 'https://www.linkedin.com/in/guillaume-becker',
  github: 'https://github.com/TuuZzee',
  source: 'https://github.com/TuuZzee/portfolio',
} as const;

export const experience = [
  {
    id: 'glassdome',
    company: 'Glassdome',
    location: profile.location,
    roles: [
      { id: 'glassdomeHead', start: '2024-11', end: '2026-10' },
      { id: 'glassdomeLead', start: '2023-09', end: '2024-11' },
    ],
  },
  {
    id: 'gofluent',
    company: 'goFLUENT',
    location: profile.location,
    roles: [{ id: 'gofluentLead', start: '2023-05', end: '2023-09' }],
  },
  {
    id: 'awair',
    company: 'Awair / Bitfinder',
    location: profile.location,
    roles: [{ id: 'awairLead', start: '2021-09', end: '2023-04' }],
  },
  {
    id: 'plutusds',
    company: 'PlutusDs (Hanbitco / Bulldax)',
    location: profile.location,
    roles: [{ id: 'plutusdsLead', start: '2019-05', end: '2021-08' }],
  },
  {
    id: 'korbit',
    company: 'Korbit',
    location: profile.location,
    roles: [{ id: 'korbitEngineer', start: '2014-04', end: '2019-02' }],
  },
  {
    id: 'earlier',
    company: 'Earlier experience',
    location: locations.france,
    roles: [{ id: 'earlierEngineer', start: '2011', end: '2014' }],
  },
] as const satisfies readonly ExperienceFact[];

export type ExperienceId = (typeof experience)[number]['id'];
export type RoleId = (typeof experience)[number]['roles'][number]['id'];

export const education = [
  { id: 'lca', start: '2026' },
  {
    id: 'epitech',
    institution: 'EPITECH Institute of Technology',
    location: locations.toulouseParis,
    start: '2014',
  },
  {
    id: 'chungAng',
    institution: 'Chung-Ang University',
    location: profile.location,
    start: '2012',
    end: '2013',
  },
] as const satisfies readonly EducationFact[];

export type EducationId = (typeof education)[number]['id'];
