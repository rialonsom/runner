import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RunnerDivider, RunnerText } from '../../ui-components';
import { UnitPreference, useUserUnitPreference } from '../../user-preferences';
import { ThemeContext } from '../../theme';
import Checkmark from '../../../assets/checkmark-icon.svg';

export function UnitSetting() {
  const { theme } = useContext(ThemeContext);
  const [unitPreference, setUnitPreference] = useUserUnitPreference();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <TouchableOpacity
        onPress={() => setUnitPreference(UnitPreference.Metric)}>
        <View style={styles.settingRow}>
          <RunnerText>Metric</RunnerText>
          {unitPreference === UnitPreference.Metric && (
            <Checkmark width={18} height={18} fill={theme.colors.primary} />
          )}
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setUnitPreference(UnitPreference.Imperial)}>
        <View style={styles.settingRow}>
          <RunnerText>Imperial</RunnerText>
          {unitPreference === UnitPreference.Imperial && (
            <Checkmark width={18} height={18} fill={theme.colors.primary} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
  },
  settingRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
});
