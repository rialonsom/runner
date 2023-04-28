import { Run, getRuns } from './getRuns';
import uuid from 'react-native-uuid';
import { storage } from './storage';

export function addRun(run: Run): Run[] {
  const runs = getRuns();

  const _id = uuid.v4() as string;
  const newRun = {
    ...run,
    _id,
  };

  const newRuns = [newRun, ...runs];
  storage.set('user.runs', JSON.stringify(newRuns));

  newRuns.sort((a: Run, b: Run) => b.date.getTime() - a.date.getTime());
  return newRuns;
}
