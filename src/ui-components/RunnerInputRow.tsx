import React from 'react';
import { StyleSheet, View } from 'react-native';

export function RunnerInputRow({ children }: { children: React.ReactNode }) {
  return <View style={[styles.container]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
