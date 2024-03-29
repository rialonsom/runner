import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
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

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (props.isOpen) {
      bottomSheetRef.current?.present();
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

  const onChange = useCallback(
    (index: number) => {
      if (index === -1) {
        props.onCancel();
      }
    },
    [props],
  );

  const BackdropComponent = useCallback(
    (backdropComponentProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropComponentProps}
        disappearsOnIndex={-1}
        style={[styles.backdrop]}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={['50%']}
      enableHandlePanningGesture={false}
      handleComponent={null}
      style={{ backgroundColor: theme.colors.card }}
      backgroundStyle={{ backgroundColor: theme.colors.card }}
      backdropComponent={BackdropComponent}
      onChange={onChange}>
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
        color={theme.colors.danger}
      />
    </BottomSheetModal>
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
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
