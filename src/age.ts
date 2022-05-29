import { DateTime, DurationObjectUnits } from 'luxon';

import { getDiff, toDateTimes } from './util';

export default function calculateAge(
  birthdayInput: string | DateTime,
  dateToCompareToInput?: string | DateTime,
): DurationObjectUnits {
  const { birthday, dateToCompareTo } = toDateTimes(birthdayInput, dateToCompareToInput);

  return getDiff(birthday, dateToCompareTo);
}
