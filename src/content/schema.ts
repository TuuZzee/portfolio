export type CareerDate = `${number}` | `${number}-${number}`;

export interface RolePeriod {
  readonly id: string;
  readonly start: CareerDate;
  readonly end: CareerDate;
}

export interface ExperienceFact {
  readonly id: string;
  readonly company: string;
  readonly location: string;
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
  readonly location?: string;
  readonly start: CareerDate;
  readonly end?: CareerDate;
}

export interface EducationCopy {
  readonly title: string;
}
