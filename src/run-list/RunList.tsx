import React, { useContext } from 'react';
import {
  ListRenderItemInfo,
  SectionList,
  SectionListData,
  StyleSheet,
  View,
} from 'react-native';

import { RunListRow } from './RunListRow';
import { useNavigation } from '@react-navigation/native';
import { RunsStackScreenProps } from '../main-tab-navigator';
import { useRuns } from '../data/useRuns';
import { Run } from '../data/storage/getRuns';
import { ThemeContext } from '../theme';
import { RunnerText } from '../ui-components';

export function RunList() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  const runs = useRuns();

  const runSections = getRunSections(runs);

  const renderItem = ({ item, index }: ListRenderItemInfo<Run>) => {
    const run = item;

    return <RunListRow run={run} index={index} navigation={navigation} />;
  };

  const renderSectionHeader = (info: {
    section: SectionListData<Run, RunListSection>;
  }) => {
    return (
      <View
        style={[
          { backgroundColor: theme.colors.background },
          styles.sectionHeader,
        ]}>
        <RunnerText style={styles.sectionHeaderTitle}>
          {info.section.title}
        </RunnerText>
      </View>
    );
  };

  return (
    <SectionList
      sections={runSections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
}

type RunListSection = {
  title: string;
  data: Run[];
};

function getRunSections(runs: Run[]): RunListSection[] {
  let currentDate = new Date(runs[0].date);
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  let currentSection: RunListSection = {
    title: currentDate.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
    }),
    data: [],
  };

  let runSections: RunListSection[] = [currentSection];

  runs.forEach(run => {
    const runDate = new Date(run.date);
    if (
      currentYear !== runDate.getFullYear() ||
      currentMonth !== runDate.getMonth()
    ) {
      currentDate = runDate;
      currentYear = runDate.getFullYear();
      currentMonth = runDate.getMonth();

      currentSection = {
        title: currentDate.toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
        }),
        data: [],
      };
      runSections.push(currentSection);
    }

    currentSection.data.push(run);
  });

  return runSections;
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 8,
    paddingLeft: 24,
  },
  sectionHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});
