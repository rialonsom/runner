import React from 'react';
import {Button, FlatList, Text} from 'react-native';
import {getRunsDisplayData} from '../../data/getRunsDisplayData';

export function RunList({navigation}) {
  const runs = getRunsDisplayData();
  return (
    <>
      <Text>Run List</Text>
      <Button
        title="Go to"
        onPress={() => navigation.navigate('NewAppScreen')}
      />
      <FlatList
        data={runs}
        renderItem={item => <Text>{item.item.date}</Text>}
      />
    </>
  );
}
