import { DateTime, DurationObjectUnits } from 'luxon';

export interface BirthdayComparisonData {
  birthday: DateTime;
  dateToCompareTo: DateTime;
}

export interface NextBirthdayInfo {
  nextBirthday: DateTime;
  durationUntilNextBirthday: DurationObjectUnits;
}

export interface BirthdayInfo {
  age: DurationObjectUnits;
  nextBirthdayInfo?: NextBirthdayInfo;
}
