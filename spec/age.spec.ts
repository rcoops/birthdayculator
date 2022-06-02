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
    ${'2024-02-28'} | ${'2024-03-28'} | ${{ years: 0, months: 1, weeks: 0, days: 0 }}
    ${'2024-02-28'} | ${'2024-02-29'} | ${{ years: 0, months: 0, weeks: 0, days: 1 }}
    ${'2024-02-28'} | ${'2024-03-01'} | ${{ years: 0, months: 0, weeks: 0, days: 2 }}
    ${'1983-08-24'} | ${'1984-08-24'} | ${{ years: 1, months: 0, weeks: 0, days: 0 }}
    ${'1983-08-24'} | ${'1983-09-24'} | ${{ years: 0, months: 1, weeks: 0, days: 0 }}
    ${'1983-08-24'} | ${'1983-08-31'} | ${{ years: 0, months: 0, weeks: 1, days: 0 }}
    ${'1983-08-24'} | ${'2022-05-29'} | ${{ years: 38, months: 9, weeks: 0, days: 5 }}
  `(
    'birthday=$birthday, comparison=$comparison, expectedAge=$expectedAge',
    ({ birthday, comparison, expectedAge }: TestData) => {
      const actualAge = calculateAge(birthday, comparison);

      expect(actualAge).toEqual(expectedAge);
    },
  );

  test.each`
    birthday        | comparison      | expectedAge
    ${'2021-05-25'} | ${'2021-05-26'} | ${{ years: 0, months: 0, weeks: 0, days: 1 }}
  `(
    'correctly calculates from now: birthday=$birthday, now=$comparison, expectedAge=$expectedAge',
    ({ birthday, comparison, expectedAge }: TestData) => {
      jest.useFakeTimers().setSystemTime(DateTime.fromISO(comparison).toMillis());
      const actualAge = calculateAge(birthday);

      expect(actualAge).toEqual(expectedAge);
    },
  );
});
