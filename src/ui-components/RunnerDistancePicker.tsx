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
import { UnitPreference, useUserUnitPreference } from '../user-preferences';
import { convertDistanceFromMeters, convertDistanceToMeters } from '../utils';
import { RunnerSecondaryText } from './RunnerSecondaryText';

export type RunnerDistancePickerOption = {
  key: string;
  label: string;
  value: number;
  enabled?: boolean;
};

export type RunnerDistancePickerProps = {
  isOpen: boolean;
  initialSelectedValue: number;
  onSelect: (selectedValue: number) => void;
  onCancel: () => void;
};

/**
 * Component that displays a picker for distance.
 * Automatically adapts for unit preference.
 * onSelect callback receives the distance in meters.
 */
export function RunnerDistancePicker(
  props: RunnerDistancePickerProps,
): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const [unitPreference] = useUserUnitPreference();

  const distanceOptions: RunnerDistancePickerOption[] = [];
  const precisionOptions: RunnerDistancePickerOption[] = [];
  for (let i = 0; i < 100; i++) {
    distanceOptions.push({
      key: i.toString(),
      label: i.toString(),
      value: i,
    });
    precisionOptions.push({
      key: i.toString(),
      label: '.' + i.toString().padStart(2, '0'),
      value: i,
    });
  }

  const { convertedDistance: initialSelectedDistance } =
    convertDistanceFromMeters(props.initialSelectedValue, unitPreference);

  const [selectedDistance, setSelectedDistance] = useState(
    Math.trunc(initialSelectedDistance),
  );
  const [selectedPrecision, setSelectedPrecision] = useState(
    Math.trunc((initialSelectedDistance % 1) * 100),
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
    const distance = selectedDistance + selectedPrecision / 100;
    const { convertedDistance: distanceMeters } = convertDistanceToMeters(
      distance,
      unitPreference,
    );

    onSelect(distanceMeters);
  }, [onSelect, selectedDistance, selectedPrecision, unitPreference]);

  const distanceUnit = unitPreference === UnitPreference.Imperial ? 'mi' : 'km';

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
        Select distance ({distanceUnit})
      </RunnerSecondaryText>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDistance}
          onValueChange={itemValue => setSelectedDistance(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {distanceOptions.map(option => (
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
          selectedValue={selectedPrecision}
          onValueChange={itemValue => setSelectedPrecision(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          {precisionOptions.map(option => (
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
