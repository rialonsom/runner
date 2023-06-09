import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './root-stack-navigator';
import { ThemeContext } from './theme';

export function AppNavigationContainer() {
  const { navigationTheme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
