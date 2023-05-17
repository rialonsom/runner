import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../theme';

export function RunnerInputGroup({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
  },
});
