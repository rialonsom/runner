import { Run, getRuns } from './getRuns';
import { storage } from './storage';

export function deleteRun(run: Run) {
  const runs = getRuns();

  const indexOfRun = runs.findIndex(item => item._id === run._id);
  runs.splice(indexOfRun, 1);

  storage.set('user.runs', JSON.stringify(runs));

  return runs;
}
