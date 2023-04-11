import { useContext } from 'react';
import format from 'format-duration';
import { RunDataContext } from './RunDataProvider';

export type SummaryDisplayData = {
  totalDistance: string;
  avgDuration: string;
};

export function useSummaryDisplayData() {
  const { state } = useContext(RunDataContext);
  const runs = state;

  const totalDistance = (
    runs.reduce((acc, cur) => acc + cur.distance_meters, 0) / 1000
  ).toFixed(2);

  const avgDuration = format(
    (runs.reduce((acc, cur) => acc + cur.duration_seconds, 0) / runs.length) *
      1000,
  );

  return {
    totalDistance,
    avgDuration,
  };
}
