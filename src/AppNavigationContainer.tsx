import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './root-stack-navigator';
import { ThemeContext } from './theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export function AppNavigationContainer() {
  const { navigationTheme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={navigationTheme}>
      <BottomSheetModalProvider>
        <RootStackNavigator />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
