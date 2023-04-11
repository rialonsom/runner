import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RunnerDivider } from '../ui-components';
import { getSummaryDisplayData } from '../../data/getSummaryDisplayData';

export function Summary() {
  const summaryDisplayData = getSummaryDisplayData();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total distance</Text>
      <Text style={styles.value}>{summaryDisplayData.totalDistance}</Text>
      <RunnerDivider />
      <Text style={styles.title}>Average duration</Text>
      <Text style={styles.value}>{summaryDisplayData.avgDuration}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '200',
  },
  value: {
    fontSize: 20,
  },
});
