import {DateTime} from 'luxon';


function toDateTime(date: string | DateTime) {
  if (typeof date === "string") {
    return DateTime.fromISO(date, {zone: 'utc'});
  }
  return date;
}

export function toDateDiff(date: string | DateTime, other?: string | DateTime) {
  date = toDateTime(date);
  other = other === undefined ? DateTime.utc() : toDateTime(other);
  return date;
}
