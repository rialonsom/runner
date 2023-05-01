import { useContext } from 'react';
import { RunDataContext } from './RunDataProvider';
import { Run } from './storage/getRuns';

export function useRun(_id: string): Run | undefined {
  const { state: runs } = useContext(RunDataContext);

  const run = runs.find(item => item._id === _id);

  return run;
}
