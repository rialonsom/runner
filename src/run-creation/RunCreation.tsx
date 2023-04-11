import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { RootStackScreenProps } from '../root-stack-navigator';
import { RunnerView, RunnerInputGroup, RunnerDivider } from '../ui-components';
import DatePicker from 'react-native-date-picker';
import { RunDataContext, RunDataReducerAction } from '../data/RunDataProvider';

export function RunCreation() {
  const navigation = useNavigation<RootStackScreenProps['navigation']>();
  const { dispatch: runDataDispatch } = useContext(RunDataContext);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const onPressDone = useCallback(() => {
    if (distance.length === 0 || duration.length === 0) {
      Alert.alert(
        'Missing fields',
        'You must complete every field before adding a new run.',
        [{ text: 'Ok' }],
      );
      return;
    }

    const run = {
      duration_seconds: parseInt(duration, 10) * 60,
      distance_meters: parseInt(distance, 10),
      date: date,
    };

    runDataDispatch({ action: RunDataReducerAction.Add, data: run });
    navigation.goBack();
  }, [date, distance, duration, navigation, runDataDispatch]);

  useEffect(() => {
    const headerLeft = () => (
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    );
    const headerRight = () => <Button title="Add" onPress={onPressDone} />;
    navigation.setOptions({ headerLeft, headerRight });
  }, [navigation, onPressDone]);

  return (
    <RunnerView>
      <RunnerInputGroup>
        <TextInput
          style={styles.inputField}
          placeholder="Distance (m)"
          inputMode="numeric"
          value={distance}
          onChangeText={setDistance}
        />
        <RunnerDivider />
        <TextInput
          style={styles.inputField}
          placeholder="Duration (minutes)"
          inputMode="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <RunnerDivider />
        <Pressable onPress={() => setDatePickerOpen(true)}>
          <Text style={styles.dateButton}>
            {date.toLocaleString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
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
