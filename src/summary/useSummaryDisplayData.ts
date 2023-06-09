import format from 'format-duration';
import { convertDistanceFromMeters, convertToDegreeTimeString } from '../utils';
import { useUserUnitPreference } from '../user-preferences';
import { useRuns } from '../data-realm/run/runHooks';

export type SummaryDisplayData = {
  totalDistance: string;
  avgDuration: string;
  runQuantity: string;
  avgPace: string;
  minYear: string;
  maxYear: string;
};

export function useSummaryDisplayData(
  year: number | undefined = undefined,
  month: number | undefined = undefined,
): SummaryDisplayData {
  const [unitPreference] = useUserUnitPreference();

  let runs = useRuns();

  const minYear = runs[runs.length - 1].date.getFullYear().toString();
  const maxYear = runs[0].date.getFullYear().toString();

  if (year !== undefined) {
    runs = runs.filter(item => item.date.getFullYear() === year);
  }

  if (month !== undefined) {
    runs = runs.filter(item => item.date.getMonth() === month);
  }

  const totalDistanceMeters = runs.reduce(
    (acc, cur) => acc + cur.distanceMeters,
    0,
  );
  const { convertedDistance: totalDistanceNumber, distanceSymbol } =
    convertDistanceFromMeters(totalDistanceMeters, unitPreference);
  const totalDistance = totalDistanceNumber.toFixed(2) + ' ' + distanceSymbol;

  const avgDuration = format(
    (runs.reduce((acc, cur) => acc + cur.durationSeconds, 0) / runs.length) *
      1000,
  );

  const runQuantity = runs.length.toString();

  const avgPaceNumber = runs.reduce((acc, cur) => {
    const { convertedDistance } = convertDistanceFromMeters(
      cur.distanceMeters,
      unitPreference,
    );
    const pace = cur.durationSeconds / convertedDistance;

    return acc + pace / runs.length;
  }, 0);

  const avgPace = convertToDegreeTimeString(avgPaceNumber);

  return {
    totalDistance,
    avgDuration,
    runQuantity,
    avgPace,
    minYear,
    maxYear,
  };
}
