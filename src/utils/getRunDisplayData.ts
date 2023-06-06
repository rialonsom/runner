import format from 'format-duration';
import { convertToDegreeTimeString } from './convertToDegreeTimeString';
import { UnitPreference } from '../user-preferences';
import { convertDistanceFromMeters } from './convertDistanceFromMeters';
import { Run } from '../data/storage/getRuns';

export type RunDisplayData = {
  _id: string;
  date: string;
  distance: string;
  duration: string;
  pace: string;
};

export function getRunDisplayData(
  run: Run,
  unitPreference: UnitPreference,
): RunDisplayData {
  const { convertedDistance, distanceSymbol } = convertDistanceFromMeters(
    run.distance_meters,
    unitPreference,
  );

  const _id = run._id;
  const duration = format(run.duration_seconds * 1000);

  const paceSeconds = (run.duration_seconds / 60 / convertedDistance) * 60;

  const pace = convertToDegreeTimeString(paceSeconds) + '/' + distanceSymbol;

  const distance = convertedDistance.toFixed(2) + ' ' + distanceSymbol;
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
