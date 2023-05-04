import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRuns } from '../data/useRuns';
import {
  RunnerDivider,
  RunnerPicker,
  RunnerPickerOption,
} from '../ui-components';
import { useNavigation } from '@react-navigation/native';
import { useSummaryDisplayData } from './useSummaryDisplayData';

export function SummaryYearTab() {
  const navigation = useNavigation();
  const runs = useRuns();

  const maxYear = runs[0].date.getFullYear();
  const minYear = runs[runs.length - 1].date.getFullYear();

  const [selectedYear, setSelectedYear] = useState(maxYear);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);

  const options: RunnerPickerOption<number>[] = [];
  for (let i = maxYear; i >= minYear; i--) {
    options.push({ key: i.toString(), label: i.toString(), value: i });
  }

  const summaryDisplayData = useSummaryDisplayData(selectedYear);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setYearPickerOpen(false);
    });

    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setYearPickerOpen(!yearPickerOpen)}>
        <Text style={styles.pickerValue}>{selectedYear}</Text>
      </Pressable>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Total runs</Text>
        <Text style={styles.value}>{summaryDisplayData.runQuantity}</Text>
        <RunnerDivider />
        <Text style={styles.title}>Total distance</Text>
        <Text style={styles.value}>{summaryDisplayData.totalDistance}</Text>
        <RunnerDivider />
        <Text style={styles.title}>Average duration</Text>
        <Text style={styles.value}>{summaryDisplayData.avgDuration}</Text>
        <RunnerDivider />
        <Text style={styles.title}>Average pace</Text>
        <Text style={styles.value}>{summaryDisplayData.avgPace}</Text>
      </View>

      <RunnerPicker
        isOpen={yearPickerOpen}
        options={options}
        initialSelectedValue={maxYear}
        onSelect={selectedValue => {
          setSelectedYear(selectedValue);
          setYearPickerOpen(false);
        }}
        onCancel={() => setYearPickerOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerValue: {
    fontSize: 24,
    paddingLeft: 20,
    paddingTop: 20,
  },
  summaryContainer: {
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
