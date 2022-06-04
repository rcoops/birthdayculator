import { DateTime, DurationObjectUnits } from 'luxon';

export type DateArgument = string | DateTime;

export type Years = number;

export interface BirthdayComparisonData {
  birthDateTime: DateTime;
  dateTimeToCompareTo: DateTime;
}

export interface Options {
  currentAge?: boolean;
  nextBirthday?: boolean;
  durationUntilNextBirthday?: boolean;
  ageAtNextBirthday?: boolean;
  nextBirthdayDayOfWeek?: boolean;
}

export interface BirthdayInfo {
  currentAge?: DurationObjectUnits;
  nextBirthday?: DateTime;
  durationUntilNextBirthday?: DurationObjectUnits;
  ageAtNextBirthday?: Years;
  nextBirthdayDayOfWeek?: string;
}

export interface BirthdayInfoArguments {
  birthDate: DateArgument;
  dateToCompareTo?: DateArgument;
  options?: Options;
}
