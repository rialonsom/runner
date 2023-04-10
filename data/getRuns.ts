import { storage } from './storage';
import data from './runs.json';

export type Run = {
  id: string;
  duration_seconds: number;
  distance_meters: number;
  date: Date;
};

export function getRuns(): Run[] {
  if (storage.contains('user.runs')) {
    const runsJson = storage.getString('user.runs');
    const runs = JSON.parse(runsJson ?? '[]');
    return runs;
  }
  const runs = data.map(run => {
    return {
      id: run._id,
      duration_seconds: run.duration_seconds,
      distance_meters: run.distance_meters,
      date: new Date(run.date),
    };
  });
  storage.set('user.runs', JSON.stringify(runs));

  return runs;
}
