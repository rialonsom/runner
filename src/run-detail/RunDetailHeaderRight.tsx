import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  RunsStackParamList,
  RunsStackScreenProps,
} from '../main-tab-navigator';
import React from 'react';
import { Button } from 'react-native';

export function RunDetailHeaderRight() {
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<RunsStackParamList, 'RunDetail'>>();
  const runId = route.params.runId;

  return (
    <Button
      title="Edit"
      onPress={() => navigation.navigate('RunCreation', { runId })}
    />
  );
}
