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
  RunnerDistancePicker,
} from '../ui-components';
import DatePicker from 'react-native-date-picker';
import { RunDataContext, RunDataReducerAction } from '../data/RunDataProvider';
import { getRun } from '../data/storage/getRun';
import { ThemeContext } from '../theme';
import { Text } from 'react-native';
import { convertDistanceFromMeters } from '../utils';
import { useUserUnitPreference } from '../user-preferences';

export function RunCreation() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RootStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<RootStackParamList, 'RunCreation'>>();
  const [unitPreference] = useUserUnitPreference();

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
      distance: run.distance_meters,
      duration: (run.duration_seconds / 60).toString(),
      date: run.date,
    };
  }, [route.params]);
  const isEdit = editRun !== undefined;

  const { dispatch: runDataDispatch } = useContext(RunDataContext);

  const [distanceMeters, setDistance] = useState(editRun?.distance ?? 0);
  const [duration] = useState(editRun?.duration ?? '');
  const [date, setDate] = useState(editRun?.date ?? new Date());
  const [time, setTime] = useState(editRun?.date ?? new Date());

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [distancePickerOpen, setDistancePickerOpen] = useState(false);

  const onPressDone = useCallback(() => {
    if (distanceMeters === 0 || duration.length === 0) {
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
      distance_meters: distanceMeters,
      date: dateTime,
    };

    runDataDispatch({
      action: isEdit ? RunDataReducerAction.Edit : RunDataReducerAction.Add,
      data: run,
    });
    navigation.goBack();
  }, [
    date,
    distanceMeters,
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

  const { convertedDistance: distance, distanceSymbol } =
    convertDistanceFromMeters(distanceMeters, unitPreference);
  const distanceString = distance.toFixed(2) + ' ' + distanceSymbol;

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
          <RunnerText>Distance</RunnerText>
          <Pressable onPress={() => setDistancePickerOpen(true)}>
            <RunnerText>{distanceString}</RunnerText>
          </Pressable>
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow>
          <Text>Duration</Text>
          <Text>2:05:00</Text>
        </RunnerInputRow>
      </RunnerInputGroup>
      <RunnerDistancePicker
        isOpen={distancePickerOpen}
        initialSelectedValue={0}
        onSelect={(selectedValue: number) => {
          setDistancePickerOpen(false);
          setDistance(selectedValue);
        }}
        onCancel={() => {
          setDistancePickerOpen(false);
        }}
      />
    </RunnerView>
  );
}
