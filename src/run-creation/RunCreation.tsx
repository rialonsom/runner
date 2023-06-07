import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, Button, Pressable } from 'react-native';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../root-stack-navigator';
import {
  RunnerView,
  RunnerInputGroup,
  RunnerDivider,
  RunnerText,
  RunnerInputRow,
} from '../ui-components';
import DatePicker from 'react-native-date-picker';
import { RunDataContext, RunDataReducerAction } from '../data/RunDataProvider';
import { getRun } from '../data/storage/getRun';
import { ThemeContext } from '../theme';
import { Text } from 'react-native';

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

  const [distance] = useState(editRun?.distance ?? '');
  const [duration] = useState(editRun?.duration ?? '');
  const [date, setDate] = useState(editRun?.date ?? new Date());
  const [time, setTime] = useState(editRun?.date ?? new Date());

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const onPressDone = useCallback(() => {
    if (distance.length === 0 || duration.length === 0) {
      Alert.alert(
        'Missing fields',
        'You must complete every field before continuing.',
        [{ text: 'Ok' }],
      );
      return;
    }

    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay(),
      time.getHours(),
      time.getMinutes(),
    );

    const run = {
      _id: editRun?._id ?? '',
      duration_seconds: parseInt(duration, 10) * 60,
      distance_meters: parseInt(distance, 10),
      date: dateTime,
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
    time,
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
        <RunnerInputRow>
          <RunnerText>Date</RunnerText>
          <Pressable onPress={() => setDatePickerOpen(true)}>
            <RunnerText>
              {date.toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </RunnerText>
          </Pressable>
          <DatePicker
            modal
            open={datePickerOpen}
            mode="date"
            date={date}
            onConfirm={(datePicked: Date) => {
              setDatePickerOpen(false);
              setDate(datePicked);
            }}
            onCancel={() => {
              setDatePickerOpen(false);
            }}
          />
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow>
          <RunnerText>Time</RunnerText>
          <Pressable onPress={() => setTimePickerOpen(true)}>
            <RunnerText>
              {time.toLocaleString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </RunnerText>
          </Pressable>
          <DatePicker
            modal
            open={timePickerOpen}
            mode="time"
            date={time}
            onConfirm={(timePicked: Date) => {
              setTimePickerOpen(false);
              setTime(timePicked);
            }}
            onCancel={() => {
              setTimePickerOpen(false);
            }}
          />
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow>
          <Text>Distance</Text>
          <Text>21.1 km</Text>
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow>
          <Text>Duration</Text>
          <Text>2:05:00</Text>
        </RunnerInputRow>
      </RunnerInputGroup>
    </RunnerView>
  );
}
