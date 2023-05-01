import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RunsStackScreenProps } from '../main-tab-navigator';
import { getRunDisplayData } from '../utils';
import { Run } from '../data/storage/getRuns';

export function RunListRow(props: {
  run: Run;
  index: number;
  navigation: RunsStackScreenProps['navigation'];
}) {
  const runDisplayData = getRunDisplayData(props.run);

  const containerStyle = [
    styles.container,
    props.index === 0 ? { marginTop: 8 } : undefined,
  ];

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('RunDetail', { runId: props.run._id })
      }>
      <View style={containerStyle}>
        <Text style={styles.distance}>{runDisplayData.distance}</Text>
        <Text style={styles.date}>{runDisplayData.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 8,
  },
  distance: {
    fontSize: 24,
  },
  date: {
    color: 'gray',
  },
});
