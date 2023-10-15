import React, { useContext } from 'react';
import { ThemeContext } from '../theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native';
import {
  ShoesStackParamList,
  ShoesStackScreenProps,
} from '../main-tab-navigator';

export function ShoeDetailHeaderRight() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<ShoesStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<ShoesStackParamList, 'ShoeDetail'>>();
  const shoeId = route.params.shoeId;

  return (
    <Button
      title="Edit"
      onPress={() => navigation.navigate('ShoeCreation', { shoeId })}
      color={theme.colors.primary}
    />
  );
}
