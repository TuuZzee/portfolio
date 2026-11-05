import type { CareerDate } from '../content/schema';

export function formatDate(value: CareerDate, locale = 'en'): string {
  const [year, month] = value.split('-');
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    ...(month ? ({ month: 'long' } as const) : {}),
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(Number(year), month ? Number(month) - 1 : 0)));
}
