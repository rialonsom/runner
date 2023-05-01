import { Run } from '../data/storage/getRuns';
import format from 'format-duration';

export type RunDisplayData = {
  _id: string;
  date: string;
  distance: string;
  duration: string;
  pace: string;
};

export function getRunDisplayData(run: Run): RunDisplayData {
  const _id = run._id;
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
    _id,
    date,
    distance,
    duration,
    pace,
  };
}
