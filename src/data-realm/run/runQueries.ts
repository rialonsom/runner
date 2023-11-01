import Realm from 'realm';
import { Run } from './runModel';

export function getRun(_id: string, realm: Realm): Run | null {
  const run = realm.objectForPrimaryKey<Run>('Run', _id);

  return run;
}

export function getRunsWithinDates(
  startDate: Date,
  endDate: Date,
  realm: Realm,
): Run[] {
  const results = realm.objects<Run>('Run');

  const runs = results.filtered('date >= $0 && date <= $1', startDate, endDate);

  return Array.from(runs);
}
