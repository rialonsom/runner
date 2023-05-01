import { useContext } from 'react';
import { Run } from './storage/getRuns';
import { RunDataContext } from './RunDataProvider';

export function useRuns(): Run[] {
  const { state: runs } = useContext(RunDataContext);

  return runs;
}
