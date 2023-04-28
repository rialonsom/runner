import { Run, getRuns } from './getRuns';

export function editRun(run: Run): Run[] {
  const runs = getRuns();

  const indexOfRun = runs.findIndex(item => item._id === run._id);
  runs.splice(indexOfRun, 1);
  const newRuns = [run, ...runs];

  newRuns.sort((a: Run, b: Run) => b.date.getTime() - a.date.getTime());

  return newRuns;
}
