import { Run, getRuns } from './getRuns';
import uuid from 'react-native-uuid';
import { storage } from './storage';

export function addRun(run: Omit<Run, '_id'>): Run[] {
  const runs = getRuns();

  const _id = uuid.v4() as string;
  const newRun = {
    _id,
    ...run,
  };

  const newRuns = [newRun, ...runs];
  storage.set('user.runs', JSON.stringify(newRuns));

  newRuns.sort((a: Run, b: Run) => b.date.getTime() - a.date.getTime());
  return newRuns;
}
