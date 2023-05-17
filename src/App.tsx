import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AppNavigationContainer } from './AppNavigationContainer';
import { ThemeProvider } from './theme';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <AppNavigationContainer />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
