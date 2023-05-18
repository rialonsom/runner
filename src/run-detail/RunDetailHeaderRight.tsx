import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  RunsStackParamList,
  RunsStackScreenProps,
} from '../main-tab-navigator';
import React, { useContext } from 'react';
import { Button } from 'react-native';
import { ThemeContext } from '../theme';

export function RunDetailHeaderRight() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<RunsStackParamList, 'RunDetail'>>();
  const runId = route.params.runId;

  return (
    <Button
      title="Edit"
      onPress={() => navigation.navigate('RunCreation', { runId })}
      color={theme.colors.primary}
    />
  );
}
