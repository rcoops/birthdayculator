import { DateTime } from 'luxon';
import toDateDiff from '../src/index';

test('thing', () => {
  expect(toDateDiff('2022-05-25Z').toISODate()).toEqual(DateTime.fromISO('2022-05-25Z').toISODate());
});

test('thing2', () => {
  expect(toDateDiff(DateTime.fromISO('2022-05-25Z'))).toEqual(DateTime.fromISO('2022-05-25Z'));
});
