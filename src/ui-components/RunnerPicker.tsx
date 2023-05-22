import { useContext, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { ThemeContext } from '../theme';

export type RunnerPickerOption<T> = {
  key: string;
  label: string;
  value: T;
  enabled?: boolean;
};

export type RunnerPickerProps<T> = {
  isOpen: boolean;
  options: RunnerPickerOption<T>[];
  initialSelectedValue: T;
  onSelect: (selectedValue: T) => void;
  onCancel: () => void;
};

export function RunnerPicker<T>(props: RunnerPickerProps<T>): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const [selectedOption, setSelectedOption] = useState(
    props.initialSelectedValue,
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (props.isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [props.isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['50%']}
      enableHandlePanningGesture={false}
      handleComponent={null}
      style={[styles.bottomSheet, { backgroundColor: theme.colors.card }]}
      backgroundStyle={{ backgroundColor: theme.colors.card }}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}
        itemStyle={styles.pickerItem}>
        {props.options.map(option => (
          <Picker.Item
            key={option.key}
            label={option.label}
            value={option.value}
            enabled={option.enabled ?? true}
            color={theme.colors.text}
          />
        ))}
      </Picker>
      <Button
        title="Select"
        onPress={() => props.onSelect(selectedOption)}
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
