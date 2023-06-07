import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { ThemeContext } from '../theme';
import { RunnerSecondaryText } from './RunnerSecondaryText';

export type RunnerDurationPickerOption = {
  key: string;
  label: string;
  value: number;
  enabled?: boolean;
};

export type RunnerDurationPickerProps = {
  isOpen: boolean;
  initialSelectedValue: number;
  onSelect: (selectedValue: number) => void;
  onCancel: () => void;
};

/**
 * Component that displays a picker for duration.
 * onSelect callback receives the time in seconds.
 */
export function RunnerDurationPicker(
  props: RunnerDurationPickerProps,
): JSX.Element {
  const { theme } = useContext(ThemeContext);

  const hourOptions: RunnerDurationPickerOption[] = [];
  const minuteOptions: RunnerDurationPickerOption[] = [];
  const secondOptions: RunnerDurationPickerOption[] = [];
  for (let i = 0; i < 24; i++) {
    hourOptions.push({
      key: i.toString(),
      label: i.toString() + 'h',
      value: i,
    });
  }
  for (let i = 0; i < 60; i++) {
    minuteOptions.push({
      key: i.toString(),
      label: i.toString() + 'm',
      value: i,
    });
    secondOptions.push({
      key: i.toString(),
      label: i.toString() + 's',
      value: i,
    });
  }

  const initialSelectedDuration = props.initialSelectedValue;

  const [selectedHour, setSelectedHour] = useState(
    Math.floor(initialSelectedDuration / (60 * 60)),
  );
  const [selectedMinute, setSelectedMinute] = useState(
    Math.floor((initialSelectedDuration % (60 * 60)) / 60),
  );
  const [selectedSecond, setSelectedSecond] = useState(
    (initialSelectedDuration % (60 * 60)) % 60,
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (props.isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [props.isOpen]);

  const onSelect = props.onSelect;
  const onSelectCallback = useCallback(() => {
    const durationSeconds =
      selectedHour * 60 * 60 + selectedMinute * 60 + selectedSecond;

    onSelect(durationSeconds);
  }, [onSelect, selectedHour, selectedMinute, selectedSecond]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['50%']}
      enableHandlePanningGesture={false}
      handleComponent={null}
      style={[styles.bottomSheet, { backgroundColor: theme.colors.card }]}
      backgroundStyle={{ backgroundColor: theme.colors.card }}>
      <RunnerSecondaryText style={styles.title}>
        Select duration
      </RunnerSecondaryText>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedHour}
          onValueChange={itemValue => setSelectedHour(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {hourOptions.map(option => (
            <Picker.Item
              key={option.key}
              label={option.label}
              value={option.value}
              enabled={option.enabled ?? true}
              color={theme.colors.text}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedMinute}
          onValueChange={itemValue => setSelectedMinute(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {minuteOptions.map(option => (
            <Picker.Item
              key={option.key}
              label={option.label}
              value={option.value}
              enabled={option.enabled ?? true}
              color={theme.colors.text}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedSecond}
          onValueChange={itemValue => setSelectedSecond(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {secondOptions.map(option => (
            <Picker.Item
              key={option.key}
              label={option.label}
              value={option.value}
              enabled={option.enabled ?? true}
              color={theme.colors.text}
            />
          ))}
        </Picker>
      </View>
      <Button
        title="Select"
        onPress={onSelectCallback}
        color={theme.colors.primary}
      />
      <Button
        title="Cancel"
        onPress={() => props.onCancel()}
        color={theme.colors.primary}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 16,
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    fontSize: 18,
  },
  bottomSheet: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
