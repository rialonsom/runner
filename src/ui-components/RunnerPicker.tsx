import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';

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
  const [selectedOption, setSelectedOption] = useState(
    props.initialSelectedValue,
  );

  if (!props.isOpen) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {props.options.map(option => (
          <Picker.Item
            key={option.key}
            label={option.label}
            value={option.value}
            enabled={option.enabled ?? true}
          />
        ))}
      </Picker>
      <Button title="Select" onPress={() => props.onSelect(selectedOption)} />
      <Button title="Cancel" onPress={props.onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    backgroundColor: 'white',
  },
});
