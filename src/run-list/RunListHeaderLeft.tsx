import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { RunsStackScreenProps } from '../main-tab-navigator';
import { ThemeContext } from '../theme';

export function RunListHeaderRight() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  return (
    <Button
      title="New run"
      onPress={() => navigation.navigate('RunCreation')}
      color={theme.colors.primary}
    />
  );
}
