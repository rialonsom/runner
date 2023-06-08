import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRuns } from '../data/useRuns';
import {
  RunnerDivider,
  RunnerPicker,
  RunnerPickerOption,
  RunnerText,
} from '../ui-components';
import { useNavigation } from '@react-navigation/native';
import { useSummaryDisplayData } from './useSummaryDisplayData';
import { ThemeContext } from '../theme';
import { RunnerSecondaryText } from '../ui-components/RunnerSecondaryText';
import ArrowDown from '../../assets/arrow-down-icon.svg';

export function SummaryYearTab() {
  const { theme } = useContext(ThemeContext);
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
        <RunnerSecondaryText style={styles.sectionTitle}>
          Total runs
        </RunnerSecondaryText>
        <RunnerText style={styles.value}>
          {summaryDisplayData.runQuantity}
        </RunnerText>
        <RunnerDivider />
        <RunnerSecondaryText style={styles.sectionTitle}>
          Total distance
        </RunnerSecondaryText>
        <RunnerText style={styles.value}>
          {summaryDisplayData.totalDistance}
        </RunnerText>
        <RunnerDivider />
        <RunnerSecondaryText style={styles.sectionTitle}>
          Average duration
        </RunnerSecondaryText>
        <RunnerText style={styles.value}>
          {summaryDisplayData.avgDuration}
        </RunnerText>
        <RunnerDivider />
        <RunnerSecondaryText style={styles.sectionTitle}>
          Average pace
        </RunnerSecondaryText>
        <RunnerText style={styles.value}>
          {summaryDisplayData.avgPace}
        </RunnerText>
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '200',
  },
  value: {
    fontSize: 20,
  },
});
