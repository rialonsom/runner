import { getRuns } from './getRuns';
import format from 'format-duration';

export type SummaryDisplayData = {
  totalDistance: string;
  avgDuration: string;
};

export function getSummaryDisplayData() {
  const runs = getRuns();

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
