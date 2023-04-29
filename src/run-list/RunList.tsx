import React from 'react';
import {
  ListRenderItemInfo,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  RunDisplayData,
  RunListSection,
  useRunListDisplayData,
} from '../data/useRunListDisplayData';
import { RunListRow } from './RunListRow';
import { useNavigation } from '@react-navigation/native';
import { RunsStackScreenProps } from '../main-tab-navigator';

export function RunList() {
  const runs = useRunListDisplayData();
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();

  const renderItem = ({ item, index }: ListRenderItemInfo<RunDisplayData>) => {
    const run = item;

    return <RunListRow run={run} index={index} navigation={navigation} />;
  };

  const renderSectionHeader = (info: {
    section: SectionListData<RunDisplayData, RunListSection>;
  }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{info.section.title}</Text>
      </View>
    );
  };

  return (
    <SectionList
      sections={runs}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 8,
    backgroundColor: 'white',
  },
  sectionHeaderTitle: {
    fontSize: 18,
  },
});
