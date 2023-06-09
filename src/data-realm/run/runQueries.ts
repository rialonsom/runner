import Realm from 'realm';
import { Run } from './runModel';

export function getRun(_id: string, realm: Realm): Run | null {
  const run = realm.objectForPrimaryKey<Run>('Run', _id);

  return run;
}
