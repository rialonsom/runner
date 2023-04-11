import { useContext } from 'react';
import format from 'format-duration';
import { RunDataContext } from './RunDataProvider';

export type RunDisplayData = {
  date: string;
  distance: string;
  duration: string;
  pace: string;
};

export function useRunsDisplayData(): RunDisplayData[] {
  const { state: rawRuns } = useContext(RunDataContext);

  const runs = rawRuns.map(run => {
    const duration = format(run.duration_seconds * 1000);
    const pace = format(
      (run.duration_seconds / 60 / (run.distance_meters / 1000)) * 60 * 1000,
    );

    const distance = (run.distance_meters / 1000).toFixed(2) + ' km';
    const date = new Date(run.date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return {
      date,
      distance,
      duration,
      pace,
    };
  });

  return runs;
}
