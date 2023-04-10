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

export function RunList({navigation}) {
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
