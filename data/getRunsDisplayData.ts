import { getRuns } from './getRuns';
import format from 'format-duration';

export type RunDisplayData = {
  date: string;
  distance: string;
  duration: string;
  pace: string;
};

export function getRunsDisplayData(): RunDisplayData[] {
  const rawRuns = getRuns();

  const runs = rawRuns.map(run => {
    const duration = format(run.duration_seconds * 1000);
    const pace = format(
      (run.duration_seconds / 60 / (run.distance_meters / 1000)) * 60 * 1000,
    );

    const distance = (run.distance_meters / 1000).toFixed(2);
    const date = new Date(run.date).toLocaleDateString();

    return {
      date,
      distance,
      duration,
      pace,
    };
  });

  return runs;
}
