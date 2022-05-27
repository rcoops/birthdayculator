import {DateTime} from 'luxon';
interface X {
  x: 1;
}

const y: X = {x: 1}
console.log(DateTime.fromISO("2022-05-27T00:00:00Z"));


export function toDateDiff(date: string | DateTime) {
  if (typeof date === "string") {
    return DateTime.fromISO(date);
  }
  return date
}