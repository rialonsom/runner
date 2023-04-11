import React from 'react';
import { StyleSheet, View } from 'react-native';

export function RunnerDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
