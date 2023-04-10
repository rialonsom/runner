import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  RunDisplayData,
  getRunsDisplayData,
} from '../../data/getRunsDisplayData';
import { useNavigation } from '@react-navigation/native';
import { RunsStackNavigationProp } from '../main-tab-navigator';

export function RunList() {
  const navigation = useNavigation<RunsStackNavigationProp>();
  const runs = getRunsDisplayData();

  const renderItem = (item: ListRenderItemInfo<RunDisplayData>) => {
    const run = item.item;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('RunDetail')}>
        <Text>{run.date}</Text>
      </TouchableOpacity>
    );
  };

  return <FlatList data={runs} renderItem={renderItem} />;
}
