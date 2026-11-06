import type { EducationId, ExperienceId, RoleId } from '../facts.ts';
import { locations, technologies } from '../facts.ts';
import type {
  EducationCopy,
  ExperienceCopy,
  PortfolioContent,
  SelectedWork,
  SkillGroup,
} from '../schema';

export const en = {
  metadata: {
    title: 'Guillaume Becker | Engineering Leader & Software Architect',
    description:
      'Software engineering leader based in Seoul. Experience in frontend architecture, engineering teams, platform development, and hands-on software delivery.',
  },
  hero: {
    discipline: 'Software Engineering',
    heading: 'Engineering Leader & Software Architect',
    introduction:
      "I'm a software engineer based in Seoul with 11+ years of experience building web products, leading frontend teams, and improving the platforms behind them. I enjoy working on architecture and engineering practices while staying hands-on with the codebase and systems.",
    action: 'Explore my work',
  },
  sections: {
    about: { title: 'About me', navigationLabel: 'About' },
    work: { title: 'Selected work', navigationLabel: 'Work' },
    experience: { title: 'Experience', navigationLabel: 'Experience' },
    skills: { title: 'Skills and expertise', navigationLabel: 'Skills' },
    education: { title: 'Education & certification', navigationLabel: 'Education' },
    contact: { title: 'Get in touch', navigationLabel: 'Contact' },
  },
  about: [
    "My background covers industrial SaaS, IoT, language learning, and fintech. I've worked across product development, frontend architecture, team leadership and developer experience, including modernizing existing applications and building shared foundations for new products.",
    "I enjoy helping teams make practical technical decisions, improving the way software is built and maintained, and staying involved in implementation. Recently, I've also been exploring Python, FastAPI, and applied AI workflows.",
  ],
  contact:
    "If you'd like to talk about engineering leadership, frontend architecture, or software projects, you can reach out through LinkedIn.",
  links: { linkedin: 'LinkedIn', github: 'GitHub' },
  experienceDetails: { show: 'View details', hide: 'Hide details' },
} as const;

export const selectedWork = [
  {
    id: 'modernization',
    employerId: 'glassdome',
    title: 'Modernizing a frontend without pausing delivery',
    context: 'Frontend architecture',
    summary:
      'Led the migration of a legacy React application toward a modular Next.js frontend platform. The migration was designed to let old and new pages coexist, so the team could improve the architecture while continuing product development.',
  },
  {
    id: 'foundations',
    employerId: 'glassdome',
    title: 'Building reusable frontend foundations',
    context: 'Industrial software',
    summary:
      'Established a frontend platform for manufacturing sustainability workflows, with separate admin and customer applications that share domain features and common infrastructure.',
  },
  {
    id: 'practices',
    employerId: 'glassdome',
    title: 'Making engineering practices part of everyday work',
    context: 'Developer experience & team leadership',
    summary:
      'Led work to make engineering standards easier to follow through clear documentation, code reviews, testing foundations, and automated checks. The goal was to help teams make consistent decisions without slowing down day-to-day delivery.',
  },
] as const satisfies readonly (SelectedWork & { employerId: ExperienceId })[];

export const roleTitles = {
  glassdomeHead: 'Head of Client Software Engineering',
  glassdomeLead: 'Senior Software Engineer / Frontend Lead',
  gofluentLead: 'Lead Frontend Software Engineer',
  awairLead: 'Lead Frontend Software Engineer',
  plutusdsLead: 'Frontend Lead / Product Manager / Software Engineer',
  korbitEngineer: 'Software Engineer',
  earlierEngineer: 'Software engineering internships / part-time roles',
} as const satisfies Record<RoleId, string>;

export const experienceCopy = {
  glassdome: {
    summary:
      'Led frontend engineering and contributed hands-on to architecture, platform modernization, and product delivery. Worked across shared Next.js/React applications, engineering standards, CI/CD, testing, localization, and collaboration with Product, Design, QA and backend teams.',
    details: [
      'Led a frontend team that numbered up to seven engineers when I joined, with mentoring, technical direction, hiring involvement and delivery coordination.',
      'Assessed legacy frontend applications and drove a phased migration toward a modular React/Next.js workspace alongside ongoing product delivery.',
      'Helped establish shared foundations for customer and admin manufacturing applications, including reusable domain modules and authentication/API infrastructure.',
      'Improved architecture documentation, development standards, review practices, testing foundations and CI/CD automation in collaboration with Product, Design, QA and backend teams.',
      'Established frontend governance through ADRs, coding standards, onboarding frameworks, review processes, release practices and architecture guidelines adopted across the engineering organization.',
      'Explored Applied AI opportunities through technical research and proof-of-concepts, including AI-assisted development workflows and automation for manufacturing sustainability applications.',
      'Led and supported security and compliance initiatives across SOC2/ISO 27001/TISAX frameworks.',
    ],
  },
  gofluent: {
    summary:
      'Worked across internal web and mobile applications, frontend architecture recommendations, and improvements to delivery and deployment workflows.',
    details: [],
  },
  awair: {
    summary:
      'Led the frontend team, built shared platform foundations, and supported application modernization, release automation, and cross-functional product delivery.',
    details: [
      'Led the frontend team through coaching, engineering standards and coordination across teams.',
      'Designed shared frontend workspace and monorepo foundations across products.',
      'Helped modernize customer-facing applications toward Next.js and improve release and preview workflows.',
    ],
  },
  plutusds: {
    summary:
      'Combined frontend leadership and product responsibilities on cryptocurrency exchange and DeFi products, from customer interfaces to shared frontend foundations and release work.',
    details: [
      'Combined product management and frontend leadership for cryptocurrency exchange and DeFi products.',
      'Helped deliver customer interfaces and reusable frontend foundations, and supported release processes and operational tooling.',
    ],
  },
  korbit: {
    summary:
      'Built customer-facing and internal fintech applications, working across frontend, backend, and cloud infrastructure for cryptocurrency exchange and related services.',
    details: [
      'Contributed to customer-facing and internal exchange, trading, remittance and administrative services.',
      'Worked across frontend, backend and infrastructure using React, Ruby on Rails, GraphQL and AWS.',
    ],
  },
  earlier: {
    summary:
      'Worked on web and backend projects at Webedia and Yoopies while completing my degree.',
    details: [],
  },
} as const satisfies Record<ExperienceId, ExperienceCopy>;

export const skillGroups = [
  {
    id: 'leadership',
    title: 'Leadership & Architecture',
    items: [
      'Frontend architecture',
      'Engineering management',
      'Team leadership',
      'Technical strategy',
      'Mentoring',
      'Code reviews',
      'Design systems',
      'Monorepos',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & Platform',
    items: [
      technologies.typescript,
      technologies.javascript,
      technologies.react,
      technologies.next,
      technologies.redux,
      technologies.rtk,
      technologies.tailwind,
      technologies.storybook,
      technologies.chromatic,
    ],
  },
  {
    id: 'quality',
    title: 'Engineering Quality & Delivery',
    items: [
      technologies.actions,
      technologies.cicd,
      technologies.playwright,
      technologies.jest,
      technologies.testingLibrary,
      'Release processes',
      'Engineering standards',
      'Monitoring',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Applied AI',
    note: 'Python, FastAPI and LLM integration are recent hands-on work and exploration.',
    items: [
      technologies.node,
      technologies.python,
      technologies.fastapi,
      'REST APIs',
      technologies.sql,
      'LLM integration',
      'Structured outputs',
      'AI-assisted engineering',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    items: [
      technologies.aws,
      technologies.cloudflare,
      technologies.docker,
      technologies.vercel,
      technologies.sentry,
    ],
  },
] satisfies readonly SkillGroup[];

export const educationCopy = {
  lca: { title: 'Life Cycle Assessment (LCA) Practitioner Certification' },
  epitech: { title: "Master's degree in Computer Science" },
  chungAng: { title: 'Exchange program' },
} as const satisfies Record<EducationId, EducationCopy>;

export const englishContent = {
  ...en,
  locale: 'en',
  metadata: { ...en.metadata, ogLocale: 'en_US' },
  experienceDetails: { ...en.experienceDetails, forCompany: 'for' },
  ui: {
    skipLink: 'Skip to content',
    mainNavigation: 'Main',
    themeGroup: 'Theme selection',
    themeLabels: { system: 'Use system theme', light: 'Use light theme', dark: 'Use dark theme' },
    backToTop: 'Back to top',
    portraitAlt: 'Portrait of Guillaume Becker',
    languageNavigation: 'Language',
    languageLabels: { en: 'Read in English', fr: 'Read in French' },
  },
  dateSeparator: 'to',
  earlierExperienceLabel: 'Earlier experience',
  locationLabels: {
    [locations.seoul]: locations.seoul,
    [locations.france]: locations.france,
    [locations.toulouseParis]: locations.toulouseParis,
  },
  selectedWork,
  roleTitles,
  experienceCopy,
  skillGroups,
  educationCopy,
} as const satisfies PortfolioContent;
