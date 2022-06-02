import { DateTime, DurationObjectUnits } from 'luxon';

import { calculateAge } from '../src/index';

interface TestData {
  birthday: string;
  comparison: string;
  expectedAge: DurationObjectUnits;
}

describe('calculateAge', () => {
  test.each`
    birthday        | comparison      | expectedAge
    ${'2021-05-25'} | ${'2022-05-25'} | ${{ years: 1, months: 0, weeks: 0, days: 0 }}
    ${'1984-08-24'} | ${'2022-05-29'} | ${{ years: 37, months: 9, weeks: 0, days: 5 }}
  `(
    'birthday=$birthday, comparison=$second, expectedAge=$expectedAge',
    ({ birthday, comparison, expectedAge }: TestData) => {
      const actualAge = calculateAge(birthday, comparison);

      expect(actualAge).toEqual(expectedAge);
    },
  );

  test.each`
    birthday        | expectedAge
    ${'2021-05-25'} | ${{ years: 0, months: 0, weeks: 0, days: 1 }}
  `('rounds datetimes to days: birthday=$birthday, expectedAge=$expectedAge', ({ birthday, expectedAge }: TestData) => {
    jest.useFakeTimers().setSystemTime(DateTime.fromISO('2021-05-26T15:00:00+01:00', { setZone: true }).toMillis());
    const actualAge = calculateAge(birthday);

    expect(actualAge).toEqual(expectedAge);
  });
});
