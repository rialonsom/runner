import { useContext } from 'react';
import format from 'format-duration';
import { RunDataContext } from './RunDataProvider';
import { RunDisplayData } from './useRunListDisplayData';

export function useRunDetailData(_id: string): RunDisplayData | undefined {
  const { state: rawRuns } = useContext(RunDataContext);

  const rawRun = rawRuns.find(item => item._id === _id);

  if (rawRun === undefined) {
    return;
  }

  const duration = format(rawRun.duration_seconds * 1000);
  const pace = format(
    (rawRun.duration_seconds / 60 / (rawRun.distance_meters / 1000)) *
      60 *
      1000,
  );

  const distance = (rawRun.distance_meters / 1000).toFixed(2) + ' km';
  const date = new Date(rawRun.date).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const run = {
    _id,
    date,
    distance,
    duration,
    pace,
  };

  return run;
}
