import format from 'format-duration';
import { convertToDegreeTimeString } from './convertToDegreeTimeString';
import { UnitPreference } from '../user-preferences';
import { convertDistanceFromMeters } from './convertDistanceFromMeters';
import { Run } from '../data-realm/run/runModel';

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
    run.distanceMeters,
    unitPreference,
  );

  const _id = run._id;
  const duration = format(run.durationSeconds * 1000);

  const paceSeconds = (run.durationSeconds / 60 / convertedDistance) * 60;

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
