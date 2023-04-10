import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './src/root-stack-navigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

export default App;
