import { BirthdayInfo, BirthdayInfoArguments, Options } from '../type';
import getNextBirthday from './next-birthday-calculation';
import { getDiff, toDateTimes } from './util';

const defaults: Options = {
  currentAge: true,
  nextBirthday: true,
  durationUntilNextBirthday: true,
  ageAtNextBirthday: true,
  nextBirthdayDayOfWeek: true,
};

export default function calculateBirthdayInfo({
  birthDate,
  dateToCompareTo,
  options,
}: BirthdayInfoArguments): BirthdayInfo {
  const actualOptions = options ?? defaults;

  const { birthDateTime, dateTimeToCompareTo } = toDateTimes(birthDate, dateToCompareTo);

  const currentAge = getDiff(birthDateTime, dateTimeToCompareTo);
  const nextBirthday = getNextBirthday(birthDateTime, dateTimeToCompareTo).setZone(birthDateTime.zone);

  const durationUntilNextBirthday = getDiff(dateTimeToCompareTo, nextBirthday);
  const ageAtNextBirthday = nextBirthday.year - birthDateTime.year;

  // clone using set to prevent mutation of original DateTime
  const { weekdayLong: nextBirthdayDayOfWeek } = nextBirthday.set({ year: nextBirthday.year });

  return {
    ...(actualOptions.currentAge && { currentAge }),
    ...(actualOptions.nextBirthday && { nextBirthday }),
    ...(actualOptions.durationUntilNextBirthday && { durationUntilNextBirthday }),
    ...(actualOptions.ageAtNextBirthday && { ageAtNextBirthday }),
    ...(actualOptions.nextBirthdayDayOfWeek && { nextBirthdayDayOfWeek }),
  };
}
