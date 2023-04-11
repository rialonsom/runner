import { storage } from './storage';
import data from './runs.json';

export type Run = {
  _id: string;
  duration_seconds: number;
  distance_meters: number;
  date: Date;
};

export function getRuns(): Run[] {
  let runsJson;
  if (storage.contains('user.runs')) {
    runsJson = JSON.parse(storage.getString('user.runs') ?? '[]');
  } else {
    runsJson = data;
  }

  const runs = runsJson.map((run: Run) => {
    return {
      id: run._id,
      duration_seconds: run.duration_seconds,
      distance_meters: run.distance_meters,
      date: new Date(run.date),
    };
  });

  runs.sort((a: Run, b: Run) => b.date.getTime() - a.date.getTime());

  return runs;
}
