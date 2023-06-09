import { useObject, useQuery } from '../RealmProvider';
import { Run } from './runModel';

export function useRuns(): Run[] {
  const runs = useQuery(Run);
  const runsByDateDescending = runs.sorted('date', true);

  return Array.from(runsByDateDescending);
}

export function useRun(_id: string): Run | null {
  const run = useObject(Run, _id);

  return run;
}
