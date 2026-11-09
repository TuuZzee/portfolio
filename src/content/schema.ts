import type { SectionId } from '../data/sections';
import type { EducationId, ExperienceId, Location, RoleId } from './facts';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export type CareerDate = `${number}` | `${number}-${number}`;

export interface RolePeriod {
  readonly id: string;
  readonly start: CareerDate;
  readonly end: CareerDate;
}

export interface ExperienceFact {
  readonly id: string;
  readonly company: string;
  readonly location: Location;
  readonly roles: readonly RolePeriod[];
}

export interface ExperienceCopy {
  readonly summary: string;
  readonly details?: readonly string[];
}

export interface SelectedWork {
  readonly id: string;
  readonly employerId: string;
  readonly title: string;
  readonly context: string;
  readonly summary: string;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly items: readonly string[];
  readonly note?: string;
}

export interface EducationFact {
  readonly id: string;
  readonly institution?: string;
  readonly location?: Location;
  readonly start: CareerDate;
  readonly end?: CareerDate;
}

export interface EducationCopy {
  readonly title: string;
}

export interface PortfolioContent {
  readonly locale: Locale;
  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly ogLocale: string;
  };
  readonly hero: {
    readonly discipline: string;
    readonly heading: string;
    readonly introduction: string;
    readonly action: string;
  };
  readonly sections: Readonly<
    Record<SectionId, { readonly title: string; readonly navigationLabel: string }>
  >;
  readonly about: readonly string[];
  readonly contact: string;
  readonly links: { readonly linkedin: string; readonly github: string };
  readonly experienceDetails: {
    readonly show: string;
    readonly hide: string;
    readonly forCompany: string;
  };
  readonly ui: {
    readonly skipLink: string;
    readonly mainNavigation: string;
    readonly themeGroup: string;
    readonly themeLabels: Readonly<Record<'system' | 'light' | 'dark', string>>;
    readonly backToTop: string;
    readonly sourceCode: string;
    readonly portraitAlt: string;
    readonly languageNavigation: string;
    readonly languageLabels: Readonly<Record<Locale, string>>;
  };
  readonly dateSeparator: string;
  readonly earlierExperienceLabel: string;
  readonly locationLabels: Readonly<Record<Location, string>>;
  readonly selectedWork: readonly (SelectedWork & { readonly employerId: ExperienceId })[];
  readonly roleTitles: Readonly<Record<RoleId, string>>;
  readonly experienceCopy: Readonly<Record<ExperienceId, ExperienceCopy>>;
  readonly skillGroups: readonly SkillGroup[];
  readonly educationCopy: Readonly<Record<EducationId, EducationCopy>>;
}
