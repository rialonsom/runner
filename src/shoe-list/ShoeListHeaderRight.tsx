import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { ShoesStackScreenProps } from '../main-tab-navigator';
import AddIcon from '../../assets/add-icon.svg';

export function ShoeListHeaderRight() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<ShoesStackScreenProps['navigation']>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ShoeCreation')}>
      <AddIcon width={20} height={20} stroke={theme.colors.primary} />
    </TouchableOpacity>
  );
}
