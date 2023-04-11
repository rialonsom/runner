import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RunDisplayData } from '../data/useRunsDisplayData';
import { RunsStackScreenProps } from '../main-tab-navigator';

export function RunListRow(props: {
  run: RunDisplayData;
  index: number;
  navigation: RunsStackScreenProps['navigation'];
}) {
  const containerStyle = [
    styles.container,
    props.index === 0 ? { marginTop: 8 } : undefined,
  ];

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('RunDetail', { run: props.run })
      }>
      <View style={containerStyle}>
        <Text style={styles.distance}>{props.run.distance}</Text>
        <Text style={styles.date}>{props.run.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 8,
  },
  distance: {
    fontSize: 24,
  },
  date: {
    color: 'gray',
  },
});
