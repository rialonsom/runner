import { StyleSheet, View } from 'react-native';
import { useSummaryDisplayData } from './useSummaryDisplayData';
import React, { useContext } from 'react';
import { RunnerDivider, RunnerStatRow, RunnerText } from '../ui-components';
import { ThemeContext } from '../theme';
import { useRuns } from '../data-realm/run/runHooks';

export function SummaryAllTab() {
  const { theme } = useContext(ThemeContext);
  const runs = useRuns();
  const summaryDisplayData = useSummaryDisplayData();

  const today = new Date();

  const maxYear = runs[0]?.date.getFullYear() ?? today.getFullYear();
  const minYear =
    runs[runs.length - 1]?.date.getFullYear() ?? today.getFullYear();

  return (
    <View>
      <RunnerText style={styles.title}>
        {minYear} - {maxYear}
      </RunnerText>
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
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '200',
  },
  value: {
    fontSize: 20,
  },
});
