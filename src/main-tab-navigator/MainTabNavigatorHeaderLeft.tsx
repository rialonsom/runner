import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { MainTabScreenProps } from '../main-tab-navigator';

export function MainTabNavigatorHeaderLeft() {
  const navigation = useNavigation<MainTabScreenProps['navigation']>();
  return (
    <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
  );
}
