import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MainTabScreenProps } from '../main-tab-navigator';
import { ThemeContext } from '../theme';
import SettingsIcon from '../../assets/settings-icon.svg';
import { TouchableOpacity } from 'react-native';

export function MainTabNavigatorHeaderLeft() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<MainTabScreenProps['navigation']>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SettingsStack')}>
      <SettingsIcon width={20} height={20} fill={theme.colors.primary} />
    </TouchableOpacity>
  );
}
