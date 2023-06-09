import { useObject, useQuery } from '../RealmProvider';
import { Run } from './runModel';

export function useRuns(): Run[] {
  const runs = useQuery(Run);

  return Array.from(runs);
}

export function useRun(_id: string): Run | null {
  const run = useObject(Run, _id);

  return run;
}
