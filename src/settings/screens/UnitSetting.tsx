import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { RunnerDivider } from '../../ui-components';
import { UnitPreference, useUserUnitPreference } from '../../user-preferences';
import { ThemeContext } from '../../theme';
import { SelectableSettingsRow } from '../SelectableSettingsRow';

export function UnitSetting() {
  const { theme } = useContext(ThemeContext);
  const [unitPreference, setUnitPreference] = useUserUnitPreference();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <SelectableSettingsRow
        preferenceName="Metric"
        isSelected={unitPreference === UnitPreference.Metric}
        onPress={() => setUnitPreference(UnitPreference.Metric)}
      />
      <RunnerDivider />
      <SelectableSettingsRow
        preferenceName="Imperial"
        isSelected={unitPreference === UnitPreference.Imperial}
        onPress={() => setUnitPreference(UnitPreference.Imperial)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
  },
});
