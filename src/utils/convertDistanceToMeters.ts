import { UnitPreference } from '../user-preferences';

type DistanceAndSymbol = {
  convertedDistance: number;
  distanceSymbol: string;
};

export function convertDistanceToMeters(
  distance: number,
  unit: UnitPreference,
): DistanceAndSymbol {
  const multiplier = unit === UnitPreference.Imperial ? 1609.34 : 1000;

  const convertedDistance = distance * multiplier;
  const distanceSymbol = unit === UnitPreference.Imperial ? 'mi' : 'km';

  return {
    convertedDistance,
    distanceSymbol,
  };
}
