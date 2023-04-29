import { useContext } from 'react';
import format from 'format-duration';
import { RunDataContext } from './RunDataProvider';
import { Run } from './storage/getRuns';

export type RunDisplayData = {
  _id: string;
  date: string;
  distance: string;
  duration: string;
  pace: string;
};

export type RunListSection = {
  title: string;
  data: RunDisplayData[];
};

function getRunDisplayData(run: Run): RunDisplayData {
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

export function useRunListDisplayData(): RunListSection[] {
  const { state: rawRuns } = useContext(RunDataContext);

  let currentDate = new Date(rawRuns[0].date);
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  let currentSection: RunListSection = {
    title: currentDate.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
    }),
    data: [],
  };

  let runs: RunListSection[] = [currentSection];

  rawRuns.forEach(run => {
    const runDate = new Date(run.date);
    if (
      currentYear !== runDate.getFullYear() ||
      currentMonth !== runDate.getMonth()
    ) {
      currentDate = runDate;
      currentYear = runDate.getFullYear();
      currentMonth = runDate.getMonth();

      currentSection = {
        title: currentDate.toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
        }),
        data: [],
      };
      runs.push(currentSection);
    }

    currentSection.data.push(getRunDisplayData(run));
  });

  return runs;
}
