import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import {
  RunsStackParamList,
  RunsStackScreenProps,
} from '../main-tab-navigator';
import { RunnerDivider, RunnerText } from '../ui-components';
import { getRunDisplayData } from '../utils';
import { ThemeContext } from '../theme';
import { RunnerSecondaryText } from '../ui-components/RunnerSecondaryText';
import { useUserUnitPreference } from '../user-preferences';
import { useRun } from '../data-realm/run/runHooks';
import { deleteRun } from '../data-realm/run/runMutations';
import { useRealm } from '../data-realm/RealmProvider';

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
        <RunnerSecondaryText style={styles.title}>Distance</RunnerSecondaryText>
        <RunnerText style={styles.value}>{runDisplayData?.distance}</RunnerText>
        <RunnerDivider />
        <RunnerSecondaryText style={styles.title}>Duration</RunnerSecondaryText>
        <RunnerText style={styles.value}>{runDisplayData?.duration}</RunnerText>
        <RunnerDivider />
        <RunnerSecondaryText style={styles.title}>Pace</RunnerSecondaryText>
        <RunnerText style={styles.value}>{runDisplayData?.pace}</RunnerText>
        <RunnerDivider />
        <RunnerSecondaryText style={styles.title}>Date</RunnerSecondaryText>
        <RunnerText style={styles.value}>{runDisplayData?.date}</RunnerText>
      </View>
      <Button title="Delete" color="red" onPress={onPressDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '300',
  },
  value: {
    fontSize: 20,
  },
});
