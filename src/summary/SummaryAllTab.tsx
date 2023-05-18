import { StyleSheet, View } from 'react-native';
import { useSummaryDisplayData } from './useSummaryDisplayData';
import React, { useContext } from 'react';
import { RunnerDivider, RunnerText } from '../ui-components';
import { RunnerSecondaryText } from '../ui-components/RunnerSecondaryText';
import { ThemeContext } from '../theme';

export function SummaryAllTab() {
  const { theme } = useContext(ThemeContext);
  const summaryDisplayData = useSummaryDisplayData();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <RunnerSecondaryText style={styles.title}>Total runs</RunnerSecondaryText>
      <RunnerText style={styles.value}>
        {summaryDisplayData.runQuantity}
      </RunnerText>
      <RunnerDivider />
      <RunnerSecondaryText style={styles.title}>
        Total distance
      </RunnerSecondaryText>
      <RunnerText style={styles.value}>
        {summaryDisplayData.totalDistance}
      </RunnerText>
      <RunnerDivider />
      <RunnerSecondaryText style={styles.title}>
        Average duration
      </RunnerSecondaryText>
      <RunnerText style={styles.value}>
        {summaryDisplayData.avgDuration}
      </RunnerText>
      <RunnerDivider />
      <RunnerSecondaryText style={styles.title}>
        Average pace
      </RunnerSecondaryText>
      <RunnerText style={styles.value}>{summaryDisplayData.avgPace}</RunnerText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
