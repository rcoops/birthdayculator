import { DurationObjectUnits } from 'luxon';

import { calculateAge } from '../src/index';

interface TestData {
  birthday: string;
  comparison: string;
  expectedAge: DurationObjectUnits;
}

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
