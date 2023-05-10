import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RunnerDivider } from '../../ui-components';
import { UnitPreference, useUserUnitPreference } from '../../user-preferences';

export function UnitSetting() {
  const [unitPreference, setUnitPreference] = useUserUnitPreference();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setUnitPreference(UnitPreference.Metric)}>
        <View style={styles.settingRow}>
          <Text>
            Metric {unitPreference === UnitPreference.Metric && '(selected)'}
          </Text>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setUnitPreference(UnitPreference.Imperial)}>
        <View style={styles.settingRow}>
          <Text>
            Imperial{' '}
            {unitPreference === UnitPreference.Imperial && '(selected)'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
