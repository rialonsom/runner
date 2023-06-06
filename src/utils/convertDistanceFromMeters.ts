import { UnitPreference } from '../user-preferences';

type DistanceAndSymbol = {
  convertedDistance: number;
  distanceSymbol: string;
};

export function convertDistanceFromMeters(
  distanceMeters: number,
  unit: UnitPreference,
): DistanceAndSymbol {
  const divisor = unit === UnitPreference.Imperial ? 1609.34 : 1000;

  const convertedDistance = distanceMeters / divisor;
  const distanceSymbol = unit === UnitPreference.Imperial ? 'mi' : 'km';

  return {
    convertedDistance,
    distanceSymbol,
  };
}
