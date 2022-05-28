import { DateTime } from 'luxon';

function toDateTime(date: string | DateTime) {
  if (typeof date === 'string') {
    return DateTime.fromISO(date, { zone: 'utc' });
  }
  return date;
}

// do a thing
export default function toDateDiff(date: string | DateTime, other?: string | DateTime) {
  const dateTime = toDateTime(date);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const otherDateTime = other === undefined ? DateTime.utc() : toDateTime(other);
  return dateTime;
}
