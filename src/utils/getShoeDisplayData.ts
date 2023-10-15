import { Shoe } from '../data-realm/shoe/shoeModel';
import { UnitPreference } from '../user-preferences';
import { convertDistanceFromMeters } from './convertDistanceFromMeters';

export type ShoeDisplayData = {
  brand: string;
  name: string;
  startDate: string;
  endDate?: string;
  lifespan: string;
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

  const { convertedDistance, distanceSymbol } = convertDistanceFromMeters(
    shoe.lifespanMeters,
    unitPreference,
  );

  return {
    brand: shoe.brand,
    name: shoe.name,
    startDate,
    endDate,
    lifespan: convertedDistance.toFixed(0) + ' ' + distanceSymbol,
  };
}
