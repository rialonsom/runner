import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RunnerText } from '../ui-components';
import Checkmark from '../../assets/checkmark-icon.svg';
import { ThemeContext } from '../theme';

export type SelectableSettingsRowProps = {
  preferenceName: string;
  isSelected: boolean;
  onPress: () => void;
};

export function SelectableSettingsRow(props: SelectableSettingsRowProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <RunnerText>{props.preferenceName}</RunnerText>
      {props.isSelected && (
        <Checkmark width={18} height={18} fill={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
});
