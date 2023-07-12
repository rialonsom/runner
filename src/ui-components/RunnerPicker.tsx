import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { ThemeContext } from '../theme';
import { RunnerSecondaryText } from '.';

export type RunnerPickerOption<T> = {
  key: string;
  label: string;
  value: T;
  enabled?: boolean;
};

export type RunnerPickerProps<T> = {
  title: string;
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

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (props.isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [props.isOpen]);

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
        {props.title}
      </RunnerSecondaryText>
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}
        itemStyle={styles.pickerItem}>
        {props.options.map(option => (
          <Picker.Item
            key={option.key}
            label={option.label}
            value={option.value}
            enabled={option.enabled !== undefined ? option.enabled : true}
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
