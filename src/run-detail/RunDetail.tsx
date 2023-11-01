import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import {
  RunsStackParamList,
  RunsStackScreenProps,
} from '../main-tab-navigator';
import { RunnerDivider } from '../ui-components';
import { getRunDisplayData } from '../utils';
import { ThemeContext } from '../theme';
import { useUserUnitPreference } from '../user-preferences';
import { useRun } from '../data-realm/run/runHooks';
import { deleteRun } from '../data-realm/run/runMutations';
import { useRealm } from '../data-realm/RealmProvider';
import { RunDetailRow } from './RunDetailRow';

export function RunDetail() {
  const realm = useRealm();
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<RunsStackParamList, 'RunDetail'>>();
  const { runId } = route.params;
  const run = useRun(runId);
  const [unitPreference] = useUserUnitPreference();

  const runDisplayData = run && getRunDisplayData(run, unitPreference);

  const onPressDelete = useCallback(() => {
    if (run === null) {
      return;
    }

    Alert.alert('Delete run', 'Are you sure you want to delete this run?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteRun(run, realm);

          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  }, [navigation, realm, run]);

  return (
    <View>
      <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
        <RunDetailRow stat="Distance" value={runDisplayData?.distance} />
        <RunnerDivider />
        <RunDetailRow stat="Duration" value={runDisplayData?.duration} />
        <RunnerDivider />
        <RunDetailRow stat="Pace" value={runDisplayData?.pace} />
        <RunnerDivider />
        <RunDetailRow stat="Date" value={runDisplayData?.date} />
        {runDisplayData?.shoe && (
          <>
            <RunnerDivider />
            <RunDetailRow
              stat="Shoe used"
              value={`${runDisplayData?.shoe?.brand} ${runDisplayData?.shoe?.name}`}
            />
          </>
        )}
      </View>
      <Button
        title="Delete"
        color={theme.colors.danger}
        onPress={onPressDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
});
