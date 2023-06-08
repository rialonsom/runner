import { StyleSheet, View } from 'react-native';
import { useSummaryDisplayData } from './useSummaryDisplayData';
import React, { useContext } from 'react';
import { RunnerDivider, RunnerText } from '../ui-components';
import { RunnerSecondaryText } from '../ui-components/RunnerSecondaryText';
import { ThemeContext } from '../theme';

export function SummaryAllTab() {
  const { theme } = useContext(ThemeContext);
  const summaryDisplayData = useSummaryDisplayData();
  const { minYear, maxYear } = summaryDisplayData;

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
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
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
