import { Theme as NavigationTheme } from '@react-navigation/native';
import React from 'react';
import {
  RunnerTheme,
  RunnerThemeName,
  runnerDarkNavigationTheme,
  runnerDarkTheme,
  runnerLightNavigationTheme,
  runnerLightTheme,
} from './RunnerTheme';
import { ThemePreference, useUserThemePreference } from '../user-preferences';
import { useColorScheme } from 'react-native';

const themePreferenceMap: Record<RunnerThemeName, RunnerThemeContextValue> = {
  light: {
    theme: runnerLightTheme,
    navigationTheme: runnerLightNavigationTheme,
  },
  dark: {
    theme: runnerDarkTheme,
    navigationTheme: runnerDarkNavigationTheme,
  },
};

export type RunnerThemeContextValue = {
  theme: RunnerTheme;
  navigationTheme: NavigationTheme;
};

export const ThemeContext = React.createContext<RunnerThemeContextValue>({
  theme: runnerLightTheme,
  navigationTheme: runnerLightNavigationTheme,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themePreference] = useUserThemePreference();
  const selectedTheme =
    themePreference === ThemePreference.System
      ? systemColorScheme ?? 'light'
      : themePreference;

  const contextValue = themePreferenceMap[selectedTheme];

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
