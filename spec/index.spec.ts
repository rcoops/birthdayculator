import { DurationObjectUnits } from 'luxon';
import calculateBirthdayInfo, { BirthdayInfo } from '../src/index';

interface TestData {
  first: string;
  second: string;
  expectedAge: DurationObjectUnits;
  expectedDurationToNextBirthday: DurationObjectUnits;
}

test.each`
  first           | second          | expectedAge                                    | expectedDurationToNextBirthday
  ${'2021-05-25'} | ${'2022-05-25'} | ${{ years: 1, months: 0, weeks: 0, days: 0 }}  | ${{ years: 1, months: 0, weeks: 0, days: 0 }}
  ${'1984-08-24'} | ${'2022-05-29'} | ${{ years: 37, months: 9, weeks: 0, days: 5 }} | ${{ years: 0, months: 2, weeks: 3, days: 5 }}
`(
  'birthday=$first, comparison=$second, expectedAge=$expectedAge + expectedAge=$expectedAge',
  ({ first, second, expectedAge, expectedDurationToNextBirthday }: TestData) => {
    const expected: BirthdayInfo = { age: expectedAge, durationUntilNextBirthday: expectedDurationToNextBirthday };

    const actual = calculateBirthdayInfo(first, second, true);

    expect(actual).toEqual(expected);
  },
);

// 2021-08-24
// 2022-05
