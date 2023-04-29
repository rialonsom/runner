import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import {
  RunsStackParamList,
  RunsStackScreenProps,
} from '../main-tab-navigator';
import { RunnerDivider } from '../ui-components';
import { useRunDetailData } from '../data/useRunDetailData';
import { RunDataReducerAction } from '../data/RunDataProvider';
import { RunDataContext } from '../data/RunDataProvider';
import { getRun } from '../data/storage/getRun';
import { Run } from '../data/storage/getRuns';

export function RunDetail() {
  const navigation = useNavigation<RunsStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<RunsStackParamList, 'RunDetail'>>();
  const { runId } = route.params;
  const run = useRunDetailData(runId);
  const { dispatch: runDataDispatch } = useContext(RunDataContext);

  const onPressDelete = useCallback(() => {
    if (run === undefined) {
      return;
    }
    const runToDelete = getRun(run._id) as Run;

    Alert.alert('Delete run', 'Are you sure you want to delete this run?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          runDataDispatch({
            action: RunDataReducerAction.Delete,
            data: runToDelete,
          });
          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  }, [navigation, run, runDataDispatch]);

  if (run === undefined) {
    return (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Distance</Text>
        <Text style={styles.value}>{run.distance}</Text>
        <RunnerDivider />
        <Text style={styles.title}>Duration</Text>
        <Text style={styles.value}>{run.duration}</Text>
        <RunnerDivider />
        <Text style={styles.title}>Pace</Text>
        <Text style={styles.value}>{run.pace}</Text>
        <RunnerDivider />
        <Text style={styles.title}>Date</Text>
        <Text style={styles.value}>{run.date}</Text>
      </View>
      <Button title="Delete" color="red" onPress={onPressDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '200',
  },
  value: {
    fontSize: 20,
  },
});
