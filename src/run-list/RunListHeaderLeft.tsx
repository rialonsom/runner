import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { RunsStackScreenProps } from '../main-tab-navigator';

export function RunListHeaderRight() {
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  return (
    <Button
      title="New run"
      onPress={() => navigation.navigate('RunCreation')}
    />
  );
}
