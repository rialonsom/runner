import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './src/root-stack-navigator';
import { RunDataProvider } from './src/data/RunDataProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <RunDataProvider>
          <RootStackNavigator />
        </RunDataProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
