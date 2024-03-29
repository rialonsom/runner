import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../root-stack-navigator';
import {
  RunnerDivider,
  RunnerText,
  RunnerInputRow,
  RunnerDistancePicker,
  RunnerDurationPicker,
  RunnerPicker,
  RunnerPickerOption,
} from '../ui-components';
import DatePicker from 'react-native-date-picker';
import { ThemeContext } from '../theme';
import { convertDistanceFromMeters } from '../utils';
import { useUserUnitPreference } from '../user-preferences';
import format from 'format-duration';
import { addRun, setRunShoe, updateRun } from '../data-realm/run/runMutations';
import { useRealm } from '../data-realm/RealmProvider';
import { getRun } from '../data-realm/run/runQueries';
import { useShoes } from '../data-realm/shoe/shoeHooks';

export function RunCreation() {
  const realm = useRealm();
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RootStackScreenProps['navigation']>();
  const route = useRoute<RouteProp<RootStackParamList, 'RunCreation'>>();
  const [unitPreference] = useUserUnitPreference();

  const editRun = useMemo(() => {
    if (route.params !== undefined && route.params.runId !== undefined) {
      return getRun(route.params.runId, realm);
    } else {
      return null;
    }
  }, [realm, route.params]);

  const shoes = useShoes();
  const shoeOptions: RunnerPickerOption<string>[] = shoes.map(shoe => ({
    key: shoe._id,
    label: shoe.brand + ' ' + shoe.name,
    value: shoe._id,
  }));
  shoeOptions.unshift({
    key: 'null',
    label: 'No shoe selected',
    value: 'null',
  });

  const isEdit = editRun !== null;

  const [distanceMeters, setDistanceMeters] = useState(
    editRun?.distanceMeters ?? 0,
  );
  const [durationSeconds, setDurationSeconds] = useState(
    editRun?.durationSeconds ?? 0,
  );
  const [date, setDate] = useState(editRun?.date ?? new Date());
  const [time, setTime] = useState(editRun?.date ?? new Date());
  const [shoeId, setShoeId] = useState(editRun?.shoe[0]?._id ?? 'null');
  const shoe = shoes.find(s => s._id === shoeId);

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [distancePickerOpen, setDistancePickerOpen] = useState(false);
  const [durationPickerOpen, setDurationPickerOpen] = useState(false);
  const [shoePickerOpen, setShoePickerOpen] = useState(false);

  const onPressDone = useCallback(() => {
    if (distanceMeters === 0 || durationSeconds === 0) {
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
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    );

    const runProps = {
      durationSeconds: durationSeconds,
      distanceMeters: distanceMeters,
      date: dateTime,
    };

    let runId;
    if (isEdit) {
      updateRun(editRun, runProps, realm);
      runId = editRun._id;
    } else {
      runId = addRun(runProps, realm);
    }

    const editedRun = getRun(runId, realm)!;
    setRunShoe(editedRun, shoe, realm);

    navigation.goBack();
  }, [
    date,
    distanceMeters,
    durationSeconds,
    editRun,
    isEdit,
    navigation,
    realm,
    shoe,
    time,
  ]);

  useEffect(() => {
    const headerLeft = () => (
      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
        color={theme.colors.danger}
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
  }, [isEdit, navigation, onPressDone, theme.colors]);

  const { convertedDistance: distance, distanceSymbol } =
    convertDistanceFromMeters(distanceMeters, unitPreference);
  const distanceString = distance.toFixed(2) + ' ' + distanceSymbol;

  const durationString = format(durationSeconds * 1000);

  return (
    <View style={styles.container}>
      <View
        style={[styles.formContainer, { backgroundColor: theme.colors.card }]}>
        <RunnerInputRow onPress={() => setDatePickerOpen(true)}>
          <RunnerText>Date</RunnerText>
          <RunnerText>
            {date.toLocaleString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </RunnerText>
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
        <RunnerInputRow onPress={() => setTimePickerOpen(true)}>
          <RunnerText>Time</RunnerText>
          <RunnerText>
            {time.toLocaleString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </RunnerText>
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
        <RunnerInputRow onPress={() => setDistancePickerOpen(true)}>
          <RunnerText>Distance</RunnerText>
          <RunnerText>{distanceString}</RunnerText>
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow onPress={() => setDurationPickerOpen(true)}>
          <RunnerText>Duration</RunnerText>
          <RunnerText>{durationString}</RunnerText>
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow onPress={() => setShoePickerOpen(true)}>
          <RunnerText>Shoe</RunnerText>
          <RunnerText>
            {shoe ? shoe.brand + ' ' + shoe.name : 'No shoe selected'}
          </RunnerText>
        </RunnerInputRow>
      </View>
      <RunnerPicker
        title="Select shoe used"
        isOpen={shoePickerOpen}
        options={shoeOptions}
        initialSelectedValue={shoeId}
        onSelect={shoeIdPicked => {
          setShoeId(shoeIdPicked);
          setShoePickerOpen(false);
        }}
        onCancel={() => {
          setShoePickerOpen(false);
        }}
      />
      <RunnerDistancePicker
        isOpen={distancePickerOpen}
        initialSelectedValue={distanceMeters}
        onSelect={(selectedValue: number) => {
          setDistancePickerOpen(false);
          setDistanceMeters(selectedValue);
        }}
        onCancel={() => {
          setDistancePickerOpen(false);
        }}
      />
      <RunnerDurationPicker
        isOpen={durationPickerOpen}
        initialSelectedValue={durationSeconds}
        onSelect={(selectedValue: number) => {
          setDurationPickerOpen(false);
          setDurationSeconds(selectedValue);
        }}
        onCancel={() => {
          setDurationPickerOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
