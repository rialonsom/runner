import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AppNavigationContainer } from './AppNavigationContainer';
import { ThemeProvider } from './theme';
import { RealmProvider } from './data-realm/RealmProvider';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <GestureHandlerRootView style={styles.container}>
        <ThemeProvider>
          <AppNavigationContainer />
        </ThemeProvider>
      </GestureHandlerRootView>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
