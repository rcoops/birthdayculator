import { DateTime, DurationObjectUnits } from 'luxon';

import { BirthdayComparisonData } from './type';

function toDate(date: string | DateTime): DateTime {
  const definitelyDate = typeof date === 'string' ? DateTime.fromISO(date) : date;

  return definitelyDate.toUTC().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
}

export function isNothing<T>(thing?: T): boolean {
  return thing === undefined || thing === null;
}

export function getDiff(first: DateTime, second: DateTime): DurationObjectUnits {
  return second.diff(first, ['years', 'months', 'weeks', 'days']).toObject();
}

export function toDateTimes(
  birthdayInput: string | DateTime,
  comparisonDateInput?: string | DateTime,
): BirthdayComparisonData {
  const birthday = toDate(birthdayInput);
  const dateToCompareTo = isNothing(comparisonDateInput) ? toDate(DateTime.utc()) : toDate(comparisonDateInput);

  return { birthday, dateToCompareTo };
}
