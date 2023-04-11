import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './src/root-stack-navigator';
import { RunDataProvider } from './src/data/RunDataProvider';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RunDataProvider>
        <RootStackNavigator />
      </RunDataProvider>
    </NavigationContainer>
  );
}

export default App;
