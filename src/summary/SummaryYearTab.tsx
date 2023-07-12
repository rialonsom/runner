import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  RunnerDivider,
  RunnerPicker,
  RunnerPickerOption,
  RunnerStatRow,
  RunnerText,
} from '../ui-components';
import { useNavigation } from '@react-navigation/native';
import { useSummaryDisplayData } from './useSummaryDisplayData';
import { ThemeContext } from '../theme';
import ArrowDown from '../../assets/arrow-down-icon.svg';
import { useRuns } from '../data-realm/run/runHooks';

export function SummaryYearTab() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const runs = useRuns();

  const today = new Date();

  const maxYear = runs[0]?.date.getFullYear() ?? today.getFullYear();
  const minYear =
    runs[runs.length - 1]?.date.getFullYear() ?? today.getFullYear();

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
      <TouchableOpacity
        onPress={() => setYearPickerOpen(!yearPickerOpen)}
        style={styles.pickerValueContainer}>
        <RunnerText style={styles.pickerValueText}>{selectedYear}</RunnerText>
        <ArrowDown
          width={12}
          height={12}
          style={styles.pickerValueArrow}
          fill={theme.colors.text}
        />
      </TouchableOpacity>
      <View
        style={[
          { backgroundColor: theme.colors.card },
          styles.summaryContainer,
        ]}>
        <RunnerStatRow
          stat="Total runs"
          value={summaryDisplayData.runQuantity}
        />
        <RunnerDivider />
        <RunnerStatRow
          stat="Total distance"
          value={summaryDisplayData.totalDistance}
        />
        <RunnerDivider />
        <RunnerStatRow
          stat="Average duration"
          value={summaryDisplayData.avgDuration}
        />
        <RunnerDivider />
        <RunnerStatRow stat="Average pace" value={summaryDisplayData.avgPace} />
      </View>

      <RunnerPicker
        title="Select year"
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
  pickerValueContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
  },
  pickerValueText: {
    fontSize: 24,
  },
  pickerValueArrow: {
    marginLeft: 4,
    alignSelf: 'center',
  },
  summaryContainer: {
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '200',
  },
  value: {
    fontSize: 20,
  },
});
