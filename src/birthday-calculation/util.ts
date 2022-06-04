import { DateTime, DurationObjectUnits } from 'luxon';

import { BirthdayComparisonData, DateArgument } from '../type';

function toDate(date: DateArgument): DateTime {
  const definitelyDate = typeof date === 'string' ? DateTime.fromISO(date) : date;

  return definitelyDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
}

export function isNothing<T>(thing?: T): boolean {
  return thing === undefined || thing === null;
}

export function getDiff(first: DateTime, second: DateTime): DurationObjectUnits {
  return second.diff(first, ['years', 'months', 'weeks', 'days']).toObject();
}

export function toDateTimes(birthDate: DateArgument, comparisonDate?: DateArgument): BirthdayComparisonData {
  const birthDateTime = toDate(birthDate);
  const dateTimeToCompareTo = isNothing(comparisonDate)
    ? toDate(DateTime.utc().setZone(birthDateTime.zone))
    : toDate(comparisonDate);

  return { birthDateTime, dateTimeToCompareTo };
}
