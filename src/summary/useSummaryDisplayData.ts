import { useContext } from 'react';
import format from 'format-duration';
import { RunDataContext } from '../data/RunDataProvider';

export type SummaryDisplayData = {
  totalDistance: string;
  avgDuration: string;
};

export function useSummaryDisplayData(year: number | undefined = undefined) {
  const { state } = useContext(RunDataContext);
  let runs = state;

  if (year !== undefined) {
    runs = runs.filter(item => item.date.getFullYear() === year);
  }

  const totalDistance =
    (runs.reduce((acc, cur) => acc + cur.distance_meters, 0) / 1000).toFixed(
      2,
    ) + ' km';

  const avgDuration = format(
    (runs.reduce((acc, cur) => acc + cur.duration_seconds, 0) / runs.length) *
      1000,
  );

  return {
    totalDistance,
    avgDuration,
  };
}
