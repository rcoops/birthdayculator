import { DateTime, DurationObjectUnits } from 'luxon';

export type Years = number;

export interface BirthdayComparisonData {
  birthDate: DateTime;
  dateToCompareTo: DateTime;
}

export interface BirthdayInfo {
  currentAge: DurationObjectUnits;
  nextBirthday: DateTime;
  durationUntilNextBirthday: DurationObjectUnits;
  ageAtNextBirthday: Years;
}
