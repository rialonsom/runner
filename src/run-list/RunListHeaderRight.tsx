import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RunsStackScreenProps } from '../main-tab-navigator';
import { ThemeContext } from '../theme';
import AddIcon from '../../assets/add-icon.svg';
import { TouchableOpacity } from 'react-native';

export function RunListHeaderRight() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('RunCreation')}>
      <AddIcon width={20} height={20} stroke={theme.colors.primary} />
    </TouchableOpacity>
  );
}
