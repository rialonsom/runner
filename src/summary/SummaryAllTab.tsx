import { StyleSheet, Text, View } from 'react-native';
import { useSummaryDisplayData } from './useSummaryDisplayData';
import React from 'react';
import { RunnerDivider } from '../ui-components';

export function SummaryAllTab() {
  const summaryDisplayData = useSummaryDisplayData();

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
