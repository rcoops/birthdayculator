import { DateTime, DurationObjectUnits } from 'luxon';

import calculateBirthdayInfo from '../src/birthday-calculation';
import { Options, Years } from '../src/type';

type Months = number;
type Weeks = number;
type Days = number;
type TestDataDuration = [Years, Months, Weeks, Days];

interface TestInput {
  birthDate: string;
  dateToCompareTo: string;
}

interface CurrentAgeTestData extends TestInput {
  expectedCurrentAge: TestDataDuration;
}

interface NextBirthdayTestData extends TestInput {
  expectedNextBirthday: string;
}

interface DurationUntilNextBirthdayTestData extends TestInput {
  expectedDurationUntilNextBirthday: TestDataDuration;
}

interface AgeAtNextBirthdayTestData extends TestInput {
  expectedAgeAtNextBirthday: Years;
}

interface NextBirthdayDayOfWeekTestData extends TestInput {
  expectedNextBirthdayDayOfWeek: Years;
}

interface OptionsTestData {
  birthDate: string;
  option: keyof Options;
}

function toDurationObjectUnits([years, months, weeks, days]: TestDataDuration): DurationObjectUnits {
  return { years, months, weeks, days };
}

describe('calculateNextBirthdayInfo', () => {
  test.each`
    birthDate       | dateToCompareTo | expectedCurrentAge
    ${'2021-05-25'} | ${'2022-05-25'} | ${[1, 0, 0, 0]}
    ${'2022-05-25'} | ${'2021-05-25'} | ${[-1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-03-28'} | ${[0, 1, 0, 0]}
    ${'2024-02-29'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-02-29'} | ${[0, 0, 0, 1]}
    ${'2024-02-28'} | ${'2024-03-01'} | ${[0, 0, 0, 2]}
    ${'2023-02-28'} | ${'2023-03-01'} | ${[0, 0, 0, 1]}
    ${'1983-08-24'} | ${'1984-08-24'} | ${[1, 0, 0, 0]}
    ${'1983-07-21'} | ${'1983-08-21'} | ${[0, 1, 0, 0]}
    ${'1983-07-21'} | ${'1983-07-28'} | ${[0, 0, 1, 0]}
    ${'1983-08-24'} | ${'2022-05-29'} | ${[38, 9, 0, 5]}
  `(
    'birthDate=$birthDate, dateToCompareTo=$dateToCompareTo, expectedCurrentAge=$expectedCurrentAge',
    ({ birthDate, dateToCompareTo, expectedCurrentAge }: CurrentAgeTestData) => {
      const { currentAge } = calculateBirthdayInfo({ birthDate, dateToCompareTo });

      expect(currentAge).toEqual(toDurationObjectUnits(expectedCurrentAge));
    },
  );

  test.each`
    birthDate       | option
    ${'2021-05-25'} | ${'currentAge'}
    ${'2022-05-25'} | ${'nextBirthday'}
    ${'2024-02-28'} | ${'durationUntilNextBirthday'}
    ${'2024-02-29'} | ${'ageAtNextBirthday'}
    ${'2024-02-28'} | ${'nextBirthdayDayOfWeek'}
  `('birthDate=$birthDate, option=$option', ({ birthDate, option }: OptionsTestData) => {
    const options = { [option]: true };

    const info = calculateBirthdayInfo({ birthDate, options });

    expect(Object.keys(info)).toEqual([option]);
  });

  test.each`
    birthDate       | dateToCompareTo | expectedCurrentAge
    ${'2021-05-25'} | ${'2022-05-25'} | ${[1, 0, 0, 0]}
    ${'2022-05-25'} | ${'2021-05-25'} | ${[-1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-03-28'} | ${[0, 1, 0, 0]}
    ${'2024-02-29'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-02-29'} | ${[0, 0, 0, 1]}
    ${'2024-02-28'} | ${'2024-03-01'} | ${[0, 0, 0, 2]}
    ${'2023-02-28'} | ${'2023-03-01'} | ${[0, 0, 0, 1]}
    ${'1983-08-24'} | ${'1984-08-24'} | ${[1, 0, 0, 0]}
    ${'1983-07-21'} | ${'1983-08-21'} | ${[0, 1, 0, 0]}
    ${'1983-07-21'} | ${'1983-07-28'} | ${[0, 0, 1, 0]}
    ${'1983-08-24'} | ${'2022-05-29'} | ${[38, 9, 0, 5]}
  `(
    'as datetime: birthDate=$birthDate, dateToCompareTo=$dateToCompareTo, expectedCurrentAge=$expectedCurrentAge',
    ({ birthDate, dateToCompareTo, expectedCurrentAge }: CurrentAgeTestData) => {
      const { currentAge } = calculateBirthdayInfo({
        birthDate: DateTime.fromISO(birthDate),
        dateToCompareTo,
      });

      expect(currentAge).toEqual(toDurationObjectUnits(expectedCurrentAge));
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedCurrentAge
    ${'2021-05-25'} | ${'2022-05-25'} | ${[1, 0, 0, 0]}
    ${'2022-05-25'} | ${'2021-05-25'} | ${[-1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-03-28'} | ${[0, 1, 0, 0]}
    ${'2024-02-29'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-02-29'} | ${[0, 0, 0, 1]}
    ${'2024-02-28'} | ${'2024-03-01'} | ${[0, 0, 0, 2]}
    ${'2023-02-28'} | ${'2023-03-01'} | ${[0, 0, 0, 1]}
    ${'1983-08-24'} | ${'1984-08-24'} | ${[1, 0, 0, 0]}
    ${'1983-07-21'} | ${'1983-08-21'} | ${[0, 1, 0, 0]}
    ${'1983-07-21'} | ${'1983-07-28'} | ${[0, 0, 1, 0]}
    ${'1983-08-24'} | ${'2022-05-29'} | ${[38, 9, 0, 5]}
  `(
    'birthDate=$birthDate, now=$dateToCompareTo, expectedCurrentAge=$expectedCurrentAge',
    ({ birthDate, dateToCompareTo, expectedCurrentAge }: CurrentAgeTestData) => {
      jest.useFakeTimers().setSystemTime(DateTime.fromISO(dateToCompareTo).toMillis());

      const { currentAge } = calculateBirthdayInfo({ birthDate });

      expect(currentAge).toEqual(toDurationObjectUnits(expectedCurrentAge));
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedNextBirthday
    ${'2021-05-25'} | ${'2022-05-25'} | ${'2023-05-25'}
    ${'2022-05-25'} | ${'2021-05-25'} | ${'2022-05-25'}
    ${'2024-02-28'} | ${'2024-03-28'} | ${'2025-02-28'}
    ${'2024-02-29'} | ${'2025-02-28'} | ${'2026-02-28'}
    ${'2024-02-28'} | ${'2025-02-28'} | ${'2026-02-28'}
    ${'2024-02-28'} | ${'2024-02-29'} | ${'2025-02-28'}
    ${'2024-02-28'} | ${'2024-03-01'} | ${'2025-02-28'}
    ${'2023-02-28'} | ${'2023-03-01'} | ${'2024-02-28'}
    ${'1983-08-24'} | ${'1984-08-24'} | ${'1985-08-24'}
    ${'1983-07-21'} | ${'1983-08-21'} | ${'1984-07-21'}
    ${'1983-07-21'} | ${'1983-07-28'} | ${'1984-07-21'}
    ${'1983-08-24'} | ${'2022-05-29'} | ${'2022-08-24'}
  `(
    'birthDate=$birthDate, dateToCompareTo=$dateToCompareTo, expectedNextBirthday=$expectedNextBirthday',
    ({ birthDate, dateToCompareTo, expectedNextBirthday }: NextBirthdayTestData) => {
      const { nextBirthday } = calculateBirthdayInfo({ birthDate, dateToCompareTo });

      expect(nextBirthday).toEqual(DateTime.fromISO(expectedNextBirthday));
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedNextBirthday
    ${'2021-05-25'} | ${'2022-05-25'} | ${'2023-05-25'}
    ${'2022-05-25'} | ${'2021-05-25'} | ${'2022-05-25'}
    ${'2024-02-28'} | ${'2024-03-28'} | ${'2025-02-28'}
    ${'2024-02-29'} | ${'2025-02-28'} | ${'2026-02-28'}
    ${'2024-02-28'} | ${'2025-02-28'} | ${'2026-02-28'}
    ${'2024-02-28'} | ${'2024-02-29'} | ${'2025-02-28'}
    ${'2024-02-28'} | ${'2024-03-01'} | ${'2025-02-28'}
    ${'2023-02-28'} | ${'2023-03-01'} | ${'2024-02-28'}
    ${'1983-08-24'} | ${'1984-08-24'} | ${'1985-08-24'}
    ${'1983-07-21'} | ${'1983-08-21'} | ${'1984-07-21'}
    ${'1983-07-21'} | ${'1983-07-28'} | ${'1984-07-21'}
    ${'1983-08-24'} | ${'2022-05-29'} | ${'2022-08-24'}
  `(
    'birthDate=$birthDate, dateToCompareTo=$dateToCompareTo, expectedNextBirthday=$expectedNextBirthday',
    ({ birthDate, dateToCompareTo, expectedNextBirthday }: NextBirthdayTestData) => {
      jest.useFakeTimers().setSystemTime(DateTime.fromISO(dateToCompareTo).toMillis());

      const { nextBirthday } = calculateBirthdayInfo({ birthDate });

      expect(nextBirthday).toEqual(DateTime.fromISO(expectedNextBirthday));
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedDurationUntilNextBirthday
    ${'2021-05-25'} | ${'2022-05-25'} | ${[1, 0, 0, 0]}
    ${'2022-05-25'} | ${'2021-05-25'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-03-28'} | ${[0, 11, 0, 0]}
    ${'2024-02-29'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-02-29'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-03-01'} | ${[0, 11, 3, 6]}
    ${'2023-02-28'} | ${'2023-03-01'} | ${[0, 11, 3, 6]}
    ${'1983-08-24'} | ${'1984-08-24'} | ${[1, 0, 0, 0]}
    ${'1983-07-21'} | ${'1983-08-21'} | ${[0, 11, 0, 0]}
    ${'1983-07-21'} | ${'1983-07-28'} | ${[0, 11, 3, 2]}
    ${'1983-08-24'} | ${'2022-05-29'} | ${[0, 2, 3, 5]}
  `(
    `birthDate=$birthDate, dateToCompareTo=$dateToCompareTo,
    expectedDurationUntilNextBirthday=$expectedDurationUntilNextBirthday`,
    ({ birthDate, dateToCompareTo, expectedDurationUntilNextBirthday }: DurationUntilNextBirthdayTestData) => {
      const { durationUntilNextBirthday } = calculateBirthdayInfo({ birthDate, dateToCompareTo });

      expect(durationUntilNextBirthday).toEqual(toDurationObjectUnits(expectedDurationUntilNextBirthday));
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedDurationUntilNextBirthday
    ${'2021-05-25'} | ${'2022-05-25'} | ${[1, 0, 0, 0]}
    ${'2022-05-25'} | ${'2021-05-25'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-03-28'} | ${[0, 11, 0, 0]}
    ${'2024-02-29'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2025-02-28'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-02-29'} | ${[1, 0, 0, 0]}
    ${'2024-02-28'} | ${'2024-03-01'} | ${[0, 11, 3, 6]}
    ${'2023-02-28'} | ${'2023-03-01'} | ${[0, 11, 3, 6]}
    ${'1983-08-24'} | ${'1984-08-24'} | ${[1, 0, 0, 0]}
    ${'1983-07-21'} | ${'1983-08-21'} | ${[0, 11, 0, 0]}
    ${'1983-07-21'} | ${'1983-07-28'} | ${[0, 11, 3, 2]}
    ${'1983-08-24'} | ${'2022-05-29'} | ${[0, 2, 3, 5]}
  `(
    `birthDate=$birthDate, now=$dateToCompareTo, expectedDurationUntilNextBirthday=$expectedDurationUntilNextBirthday`,
    ({ birthDate, dateToCompareTo, expectedDurationUntilNextBirthday }: DurationUntilNextBirthdayTestData) => {
      jest.useFakeTimers().setSystemTime(DateTime.fromISO(dateToCompareTo).toMillis());

      const { durationUntilNextBirthday } = calculateBirthdayInfo({ birthDate });

      expect(durationUntilNextBirthday).toEqual(toDurationObjectUnits(expectedDurationUntilNextBirthday));
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedAgeAtNextBirthday
    ${'2021-05-25'} | ${'2022-05-25'} | ${2}
    ${'2022-05-25'} | ${'2021-05-25'} | ${0}
    ${'2024-02-28'} | ${'2024-03-28'} | ${1}
    ${'2024-02-29'} | ${'2025-02-28'} | ${2}
    ${'2024-02-28'} | ${'2025-02-28'} | ${2}
    ${'2024-02-28'} | ${'2024-02-29'} | ${1}
    ${'2024-02-28'} | ${'2024-03-01'} | ${1}
    ${'2023-02-28'} | ${'2023-03-01'} | ${1}
    ${'1983-08-24'} | ${'1984-08-24'} | ${2}
    ${'1983-07-21'} | ${'1983-08-21'} | ${1}
    ${'1983-07-21'} | ${'1983-07-28'} | ${1}
    ${'1983-08-24'} | ${'2022-05-29'} | ${39}
  `(
    'birthDate=$birthDate, dateToCompareTo=$dateToCompareTo, expectedAgeAtNextBirthday=$expectedAgeAtNextBirthday',
    ({ birthDate, dateToCompareTo, expectedAgeAtNextBirthday }: AgeAtNextBirthdayTestData) => {
      const { ageAtNextBirthday } = calculateBirthdayInfo({ birthDate, dateToCompareTo });

      expect(ageAtNextBirthday).toEqual(expectedAgeAtNextBirthday);
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedAgeAtNextBirthday
    ${'2021-05-25'} | ${'2022-05-25'} | ${2}
    ${'2022-05-25'} | ${'2021-05-25'} | ${0}
    ${'2024-02-28'} | ${'2024-03-28'} | ${1}
    ${'2024-02-29'} | ${'2025-02-28'} | ${2}
    ${'2024-02-28'} | ${'2025-02-28'} | ${2}
    ${'2024-02-28'} | ${'2024-02-29'} | ${1}
    ${'2024-02-28'} | ${'2024-03-01'} | ${1}
    ${'2023-02-28'} | ${'2023-03-01'} | ${1}
    ${'1983-08-24'} | ${'1984-08-24'} | ${2}
    ${'1983-07-21'} | ${'1983-08-21'} | ${1}
    ${'1983-07-21'} | ${'1983-07-28'} | ${1}
    ${'1983-08-24'} | ${'2022-05-29'} | ${39}
  `(
    `birthDate=$birthDate, now=$dateToCompareTo, expectedAgeAtNextBirthday=$expectedAgeAtNextBirthday`,
    ({ birthDate, dateToCompareTo, expectedAgeAtNextBirthday }: AgeAtNextBirthdayTestData) => {
      jest.useFakeTimers().setSystemTime(DateTime.fromISO(dateToCompareTo).toMillis());

      const { ageAtNextBirthday } = calculateBirthdayInfo({ birthDate });

      expect(ageAtNextBirthday).toEqual(expectedAgeAtNextBirthday);
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedNextBirthdayDayOfWeek
    ${'2021-05-25'} | ${'2022-05-25'} | ${'Thursday'}
    ${'2022-05-25'} | ${'2021-05-25'} | ${'Wednesday'}
    ${'2024-02-28'} | ${'2024-03-28'} | ${'Friday'}
    ${'2024-02-29'} | ${'2025-02-28'} | ${'Saturday'}
    ${'2024-02-28'} | ${'2025-02-28'} | ${'Saturday'}
    ${'2024-02-28'} | ${'2024-02-29'} | ${'Friday'}
    ${'2024-02-28'} | ${'2024-03-01'} | ${'Friday'}
    ${'2023-02-28'} | ${'2023-03-01'} | ${'Wednesday'}
    ${'1983-08-24'} | ${'1984-08-24'} | ${'Saturday'}
    ${'1983-07-21'} | ${'1983-08-21'} | ${'Saturday'}
    ${'1983-07-21'} | ${'1983-07-28'} | ${'Saturday'}
    ${'1983-08-24'} | ${'2022-05-29'} | ${'Wednesday'}
  `(
    `birthDate=$birthDate, dateToCompareTo=$dateToCompareTo,
    expectedNextBirthdayDayOfWeek=$expectedNextBirthdayDayOfWeek`,
    ({ birthDate, dateToCompareTo, expectedNextBirthdayDayOfWeek }: NextBirthdayDayOfWeekTestData) => {
      const { nextBirthdayDayOfWeek } = calculateBirthdayInfo({ birthDate, dateToCompareTo });

      expect(nextBirthdayDayOfWeek).toEqual(expectedNextBirthdayDayOfWeek);
    },
  );

  test.each`
    birthDate       | dateToCompareTo | expectedNextBirthdayDayOfWeek
    ${'2021-05-25'} | ${'2022-05-25'} | ${'Thursday'}
    ${'2022-05-25'} | ${'2021-05-25'} | ${'Wednesday'}
    ${'2024-02-28'} | ${'2024-03-28'} | ${'Friday'}
    ${'2024-02-29'} | ${'2025-02-28'} | ${'Saturday'}
    ${'2024-02-28'} | ${'2025-02-28'} | ${'Saturday'}
    ${'2024-02-28'} | ${'2024-02-29'} | ${'Friday'}
    ${'2024-02-28'} | ${'2024-03-01'} | ${'Friday'}
    ${'2023-02-28'} | ${'2023-03-01'} | ${'Wednesday'}
    ${'1983-08-24'} | ${'1984-08-24'} | ${'Saturday'}
    ${'1983-07-21'} | ${'1983-08-21'} | ${'Saturday'}
    ${'1983-07-21'} | ${'1983-07-28'} | ${'Saturday'}
    ${'1983-08-24'} | ${'2022-05-29'} | ${'Wednesday'}
  `(
    `birthDate=$birthDate, now=$dateToCompareTo, expectedNextBirthdayDayOfWeek=$expectedNextBirthdayDayOfWeek`,
    ({ birthDate, dateToCompareTo, expectedNextBirthdayDayOfWeek }: NextBirthdayDayOfWeekTestData) => {
      jest.useFakeTimers().setSystemTime(DateTime.fromISO(dateToCompareTo).toMillis());

      const { nextBirthdayDayOfWeek } = calculateBirthdayInfo({ birthDate });

      expect(nextBirthdayDayOfWeek).toEqual(expectedNextBirthdayDayOfWeek);
    },
  );
});
