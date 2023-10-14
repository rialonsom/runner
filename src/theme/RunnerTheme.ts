import {
  DefaultTheme,
  DarkTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';

export type RunnerThemeName = 'light' | 'dark';

type ComplementaryTheme = {
  colors: {
    secondaryText: string;
    placeholderText: string;
    danger: string;
  };
};

export type RunnerTheme = NavigationTheme & ComplementaryTheme;

export const runnerLightNavigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#30b0c7',
  },
};

export const runnerLightTheme: RunnerTheme = {
  ...runnerLightNavigationTheme,
  colors: {
    ...runnerLightNavigationTheme.colors,
    secondaryText: 'gray',
    placeholderText: '#c7c7c7',
    danger: '#ff3b30',
  },
};

export const runnerDarkNavigationTheme: NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#40c8e0',
  },
};

export const runnerDarkTheme: RunnerTheme = {
  ...runnerDarkNavigationTheme,
  colors: {
    ...runnerDarkNavigationTheme.colors,
    secondaryText: 'gray',
    placeholderText: '#3c3c3c',
    danger: '#ff443a',
  },
};
