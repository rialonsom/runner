import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useRuns } from '../data/useRuns';
import { RunnerPicker, RunnerPickerOption } from '../ui-components';

export function SummaryYearTab() {
  const runs = useRuns();

  const maxYear = runs[0].date.getFullYear();
  const minYear = runs[runs.length - 1].date.getFullYear();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearPickerOpen, setYearPickerOpen] = useState(false);

  const options: RunnerPickerOption<number>[] = [];
  for (let i = maxYear; i >= minYear; i--) {
    options.push({ key: i.toString(), label: i.toString(), value: i });
  }

  return (
    <View style={styles.container}>
      <Text>{selectedYear}</Text>
      <Button
        title="Select year"
        onPress={() => setYearPickerOpen(!yearPickerOpen)}
      />
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
});
