import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { MainTabScreenProps } from '../main-tab-navigator';
import { ThemeContext } from '../theme';

export function MainTabNavigatorHeaderLeft() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<MainTabScreenProps['navigation']>();
  return (
    <Button
      title="Settings"
      onPress={() => navigation.navigate('SettingsStack')}
      color={theme.colors.primary}
    />
  );
}
