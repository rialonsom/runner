import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import {
  RunDisplayData,
  getRunsDisplayData,
} from '../../data/getRunsDisplayData';
import { RunListRow } from './RunListRow';
import { useNavigation } from '@react-navigation/native';
import { RunsStackScreenProps } from '../main-tab-navigator';

export function RunList() {
  const runs = getRunsDisplayData();
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();

  const renderItem = ({ item, index }: ListRenderItemInfo<RunDisplayData>) => {
    const run = item;

    return <RunListRow run={run} index={index} navigation={navigation} />;
  };

  return <FlatList data={runs} renderItem={renderItem} />;
}
