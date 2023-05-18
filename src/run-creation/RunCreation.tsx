import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, Button, Pressable, StyleSheet, TextInput } from 'react-native';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../root-stack-navigator';
import {
  RunnerView,
  RunnerInputGroup,
  RunnerDivider,
  RunnerText,
} from '../ui-components';
import DatePicker from 'react-native-date-picker';
import { RunDataContext, RunDataReducerAction } from '../data/RunDataProvider';
import { getRun } from '../data/storage/getRun';
import { ThemeContext } from '../theme';

export function RunCreation() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RootStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<RootStackParamList, 'RunCreation'>>();

  const editRun = useMemo(() => {
    const isEditMode = route.params !== undefined;
    if (!isEditMode) {
      return;
    }

    const run = getRun(route.params.runId);
    if (!run) {
      return;
    }

    return {
      _id: run._id,
      distance: run.distance_meters.toString(),
      duration: (run.duration_seconds / 60).toString(),
      date: run.date,
    };
  }, [route.params]);
  const isEdit = editRun !== undefined;

  const { dispatch: runDataDispatch } = useContext(RunDataContext);

  const [distance, setDistance] = useState(editRun?.distance ?? '');
  const [duration, setDuration] = useState(editRun?.duration ?? '');
  const [date, setDate] = useState(editRun?.date ?? new Date());

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const onPressDone = useCallback(() => {
    if (distance.length === 0 || duration.length === 0) {
      Alert.alert(
        'Missing fields',
        'You must complete every field before continuing.',
        [{ text: 'Ok' }],
      );
      return;
    }

    const run = {
      _id: editRun?._id ?? '',
      duration_seconds: parseInt(duration, 10) * 60,
      distance_meters: parseInt(distance, 10),
      date: date,
    };

    runDataDispatch({
      action: isEdit ? RunDataReducerAction.Edit : RunDataReducerAction.Add,
      data: run,
    });
    navigation.goBack();
  }, [
    date,
    distance,
    duration,
    editRun?._id,
    isEdit,
    navigation,
    runDataDispatch,
  ]);

  useEffect(() => {
    const headerLeft = () => (
      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
        color={theme.colors.primary}
      />
    );
    const headerRight = () => (
      <Button
        title={isEdit ? 'Done' : 'Add'}
        onPress={onPressDone}
        color={theme.colors.primary}
      />
    );
    const title = isEdit ? 'Edit run' : 'New run';
    navigation.setOptions({ title, headerLeft, headerRight });
  }, [isEdit, navigation, onPressDone, theme.colors.primary]);

  return (
    <RunnerView>
      <RunnerInputGroup>
        <TextInput
          style={[{ color: theme.colors.text }, styles.inputField]}
          placeholder="Distance (m)"
          inputMode="numeric"
          value={distance}
          onChangeText={setDistance}
        />
        <RunnerDivider />
        <TextInput
          style={[{ color: theme.colors.text }, styles.inputField]}
          placeholder="Duration (minutes)"
          inputMode="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <RunnerDivider />
        <Pressable onPress={() => setDatePickerOpen(true)}>
          <RunnerText style={styles.dateButton}>
            {date.toLocaleString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </RunnerText>
        </Pressable>
        <DatePicker
          modal
          open={datePickerOpen}
          mode="datetime"
          date={date}
          onConfirm={(datePicked: Date) => {
            setDatePickerOpen(false);
            setDate(datePicked);
          }}
          onCancel={() => {
            setDatePickerOpen(false);
          }}
        />
      </RunnerInputGroup>
    </RunnerView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    fontSize: 16,
  },
  dateButton: {
    fontSize: 16,
  },
});
