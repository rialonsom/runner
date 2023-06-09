import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { useRuns } from '../data-realm/run/runHooks';

export function SummaryMonthTab() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const runs = useRuns();

  const today = new Date();

  const maxYear = runs[0].date.getFullYear();
  const minYear = runs[runs.length - 1].date.getFullYear();

  const [selectedYear, setSelectedYear] = useState(maxYear);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);

  const yearOptions: RunnerPickerOption<number>[] = [];
  for (let i = maxYear; i >= minYear; i--) {
    yearOptions.push({ key: i.toString(), label: i.toString(), value: i });
  }

  const monthOptions: RunnerPickerOption<number>[] = [];
  for (let i = 0; i < 12; i++) {
    const enabled =
      selectedYear !== today.getFullYear() || i <= today.getMonth();

    if (!enabled) {
      break;
    }

    monthOptions.push({
      key: i.toString(),
      label: new Date(maxYear, i).toLocaleString(undefined, { month: 'long' }),
      value: i,
    });
  }

  const summaryDisplayData = useSummaryDisplayData(selectedYear, selectedMonth);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setYearPickerOpen(false);
    });

    return unsubscribe;
  });

  const selectedMonthString = new Date(
    selectedYear,
    selectedMonth,
  ).toLocaleString(undefined, { month: 'long' });

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        <TouchableOpacity
          onPress={() => setMonthPickerOpen(!monthPickerOpen)}
          style={styles.pickerValueContainer}>
          <RunnerText style={styles.pickerValueText}>
            {selectedMonthString}
          </RunnerText>
          <ArrowDown
            width={12}
            height={12}
            style={styles.pickerValueArrow}
            fill={theme.colors.text}
          />
        </TouchableOpacity>
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
      </View>
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
        options={yearOptions}
        initialSelectedValue={maxYear}
        onSelect={selectedValue => {
          const todayYear = today.getFullYear();
          const todayMonth = today.getMonth();
          setSelectedYear(selectedValue);
          if (selectedValue === todayYear && selectedMonth > todayMonth) {
            setSelectedMonth(todayMonth);
          }
          setYearPickerOpen(false);
        }}
        onCancel={() => setYearPickerOpen(false)}
      />
      <RunnerPicker
        isOpen={monthPickerOpen}
        options={monthOptions}
        initialSelectedValue={today.getMonth()}
        onSelect={selectedValue => {
          setSelectedMonth(selectedValue);
          setMonthPickerOpen(false);
        }}
        onCancel={() => setMonthPickerOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerValueContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
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
