import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
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
    const distance = selectedDistance + selectedPrecision / 100;
    const { convertedDistance: distanceMeters } = convertDistanceToMeters(
      distance,
      unitPreference,
    );

    onSelect(distanceMeters);
  }, [onSelect, selectedDistance, selectedPrecision, unitPreference]);

  const distanceUnit = unitPreference === UnitPreference.Imperial ? 'mi' : 'km';

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
