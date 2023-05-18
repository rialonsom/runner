import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RunnerDivider, RunnerText } from '../../ui-components';
import { UnitPreference, useUserUnitPreference } from '../../user-preferences';
import { ThemeContext } from '../../theme';

export function UnitSetting() {
  const { theme } = useContext(ThemeContext);
  const [unitPreference, setUnitPreference] = useUserUnitPreference();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <TouchableOpacity
        onPress={() => setUnitPreference(UnitPreference.Metric)}>
        <View style={styles.settingRow}>
          <RunnerText>
            Metric {unitPreference === UnitPreference.Metric && '(selected)'}
          </RunnerText>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setUnitPreference(UnitPreference.Imperial)}>
        <View style={styles.settingRow}>
          <RunnerText>
            Imperial{' '}
            {unitPreference === UnitPreference.Imperial && '(selected)'}
          </RunnerText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    paddingVertical: 10,
  },
  settingRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 28,
  },
});
