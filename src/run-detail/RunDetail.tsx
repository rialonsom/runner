import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RunsStackParamList } from '../main-tab-navigator';
import { RunnerDivider } from '../ui-components';

export function RunDetail() {
  const route = useRoute<RouteProp<RunsStackParamList, 'RunDetail'>>();
  const { run } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distance</Text>
      <Text style={styles.value}>{run.distance} km</Text>
      <RunnerDivider />
      <Text style={styles.title}>Duration</Text>
      <Text style={styles.value}>{run.duration}</Text>
      <RunnerDivider />
      <Text style={styles.title}>Pace</Text>
      <Text style={styles.value}>{run.pace}</Text>
      <RunnerDivider />
      <Text style={styles.title}>Date</Text>
      <Text style={styles.value}>{run.date}</Text>
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
