import { DateTime } from 'luxon';
import { toDateDiff } from '../src/index';

test('thing', () => {
  expect(toDateDiff('2022-05-25')).toEqual(DateTime.fromISO('2022-05-25'))
});