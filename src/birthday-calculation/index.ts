import { DateTime } from 'luxon';

import { BirthdayInfo } from '../type';
import getNextBirthday from './next-birthday-calculation';
import { getDiff, toDateTimes } from './util';

export default function calculateNextBirthdayInfo(
  birthDateInput: string | DateTime,
  dateToCompareToInput?: string | DateTime,
): BirthdayInfo {
  const { birthDate, dateToCompareTo } = toDateTimes(birthDateInput, dateToCompareToInput);

  const currentAge = getDiff(birthDate, dateToCompareTo);
  const nextBirthday = getNextBirthday(birthDate, dateToCompareTo).setZone(birthDate.zone);

  const durationUntilNextBirthday = getDiff(dateToCompareTo, nextBirthday);
  const ageAtNextBirthday = nextBirthday.year - birthDate.year;

  return { currentAge, nextBirthday, durationUntilNextBirthday, ageAtNextBirthday };
}
