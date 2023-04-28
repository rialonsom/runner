import { Run, getRuns } from './getRuns';

export function getRun(_id: string): Run | undefined {
  const runs = getRuns();

  return runs.find(run => run._id === _id);
}
