import { Shoe } from '../data-realm/shoe/shoeModel';
import { UnitPreference } from '../user-preferences';
import { convertDistanceFromMeters } from './convertDistanceFromMeters';

export type ShoeDisplayData = {
  brand: string;
  name: string;
  startDate: string;
  endDate?: string;
  lifespan: string;
  distanceTraveled: string;
};

export function getShoeDisplayData(
  shoe: Shoe,
  unitPreference: UnitPreference,
): ShoeDisplayData {
  const startDate = shoe.startDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const endDate = shoe.endDate?.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const {
    convertedDistance: convertedLifespan,
    distanceSymbol: lifespanSymbol,
  } = convertDistanceFromMeters(shoe.lifespanMeters, unitPreference);

  const distanceTraveledMeters = shoe.runs.reduce(
    (acc, cur) => acc + cur.distanceMeters,
    0,
  );
  const {
    convertedDistance: distanceTraveled,
    distanceSymbol: distanceTraveledSymbol,
  } = convertDistanceFromMeters(distanceTraveledMeters, unitPreference);

  return {
    brand: shoe.brand,
    name: shoe.name,
    startDate,
    endDate,
    lifespan: convertedLifespan.toFixed(0) + ' ' + lifespanSymbol,
    distanceTraveled:
      distanceTraveled.toFixed(2) + ' ' + distanceTraveledSymbol,
  };
}
