import { Run, getRuns } from './getRuns';
import uuid from 'react-native-uuid';
import { storage } from './storage';

export function addRun(run: Partial<Run>) {
  const runs = getRuns();

  const id = uuid.v4();
  const newRun = {
    id,
    ...run,
  };

  const newRuns = [...runs, newRun];
  storage.set('user.runs', JSON.stringify(newRuns));
}
