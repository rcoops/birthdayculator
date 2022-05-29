import { DateTime, DurationObjectUnits } from 'luxon';

import { BirthdayComparisonData } from './type';

function toDateTime(date: string | DateTime): DateTime {
  if (typeof date === 'string') {
    return DateTime.fromISO(date, { zone: 'utc' });
  }
  return date;
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
  const birthday = toDateTime(birthdayInput);
  const dateToCompareTo = isNothing(comparisonDateInput) ? DateTime.utc() : toDateTime(comparisonDateInput);

  return { birthday, dateToCompareTo };
}
