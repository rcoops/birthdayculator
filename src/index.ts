import { DateTime, DurationObjectUnits } from 'luxon';

export interface NextBirthdayInfo {
  nextBirthday: DateTime;
  durationUntilNextBirthday: DurationObjectUnits;
}

export interface BirthdayInfo {
  age: DurationObjectUnits;
  nextBirthdayInfo?: NextBirthdayInfo;
}

function toDateTime(date: string | DateTime): DateTime {
  if (typeof date === 'string') {
    return DateTime.fromISO(date, { zone: 'utc' });
  }
  return date;
}

function isNothing<T>(thing?: T): boolean {
  return thing === undefined || thing === null;
}

function getNextBirthday(birthday: DateTime, comparisonDate: DateTime): DateTime {
  const birthdayThisYear = birthday.set({ year: comparisonDate.year });
  return birthdayThisYear <= comparisonDate
    ? birthdayThisYear.set({ year: birthdayThisYear.year + 1 })
    : birthdayThisYear;
}

function getDiff(first: DateTime, second: DateTime): DurationObjectUnits {
  return second.diff(first, ['years', 'months', 'weeks', 'days']).toObject();
}

function calculateNextBirthdayInfo(birthday: DateTime, comparisonDate: DateTime): NextBirthdayInfo {
  const nextBirthday = getNextBirthday(birthday, comparisonDate);
  const durationUntilNextBirthday = getDiff(comparisonDate, nextBirthday);
  return { nextBirthday, durationUntilNextBirthday };
}

// do a thing
export default function calculateBirthdayInfo(
  birthdayInput: string | DateTime,
  comparisonDateInput?: string | DateTime,
  includeNextBirthday = false,
): BirthdayInfo {
  const birthday = toDateTime(birthdayInput);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const comparisonDate = isNothing(comparisonDateInput) ? DateTime.utc() : toDateTime(comparisonDateInput);

  const age = getDiff(birthday, comparisonDate);

  return {
    age,
    ...(includeNextBirthday ? { nextBirthdayInfo: calculateNextBirthdayInfo(birthday, comparisonDate) } : {}),
  };
}
