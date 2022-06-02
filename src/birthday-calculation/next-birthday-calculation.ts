import { DateTime } from 'luxon';

export default function getNextBirthday(birthday: DateTime, comparisonDate: DateTime): DateTime {
  const birthdayThisYear = birthday.set({ year: comparisonDate.year });
  return birthdayThisYear <= comparisonDate
    ? birthdayThisYear.set({ year: birthdayThisYear.year + 1 })
    : birthdayThisYear;
}
