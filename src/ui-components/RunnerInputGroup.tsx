import React from 'react';
import { StyleSheet, View } from 'react-native';

export function RunnerInputGroup({ children }: { children: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
