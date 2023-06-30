import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { RunnerSecondaryText, RunnerText } from '../ui-components';
import ArrowRight from '../../assets/arrow-right-icon.svg';
import { ThemeContext } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

type SettingsRowProps = {
  preferenceName: string;
  preferenceValue: string;
  onPress: () => void;
};

export function SettingsRow(props: SettingsRowProps): JSX.Element {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.rowContainer}>
      <RunnerText>{props.preferenceName}</RunnerText>
      <View style={styles.valueContainer}>
        <RunnerSecondaryText>{props.preferenceValue}</RunnerSecondaryText>
        <ArrowRight
          style={styles.arrow}
          fill={theme.colors.secondaryText}
          width={8}
          height={8}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: 5,
  },
});
