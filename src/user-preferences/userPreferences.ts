import { createUserPreference } from './createUserPreference';

export const useUserDummyPreference = createUserPreference<boolean>(
  'dummy',
  false,
);

export enum ThemePreference {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}
export const useUserThemePreference = createUserPreference<ThemePreference>(
  'theme',
  ThemePreference.System,
);

export enum UnitPreference {
  Metric = 'metric',
  Imperial = 'imperial',
}
export const useUserUnitPreference = createUserPreference<UnitPreference>(
  'unit',
  UnitPreference.Metric,
);
