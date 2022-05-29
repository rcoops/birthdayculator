import { DateTime } from 'luxon';

import { NextBirthdayInfo } from './type';
import { getDiff, toDateTimes } from './util';

function getNextBirthday(birthday: DateTime, comparisonDate: DateTime): DateTime {
  const birthdayThisYear = birthday.set({ year: comparisonDate.year });
  return birthdayThisYear <= comparisonDate
    ? birthdayThisYear.set({ year: birthdayThisYear.year + 1 })
    : birthdayThisYear;
}

export default function calculateNextBirthdayInfo(
  birthdayInput: string | DateTime,
  dateToCompareToInput?: string | DateTime,
): NextBirthdayInfo {
  const { birthday, dateToCompareTo } = toDateTimes(birthdayInput, dateToCompareToInput);
  const nextBirthday = getNextBirthday(birthday, dateToCompareTo);
  const durationUntilNextBirthday = getDiff(dateToCompareTo, nextBirthday);
  return { nextBirthday, durationUntilNextBirthday };
}
