import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RunnerDivider } from '../../ui-components';
import {
  ThemePreference,
  useUserThemePreference,
} from '../../user-preferences';

export function ThemeSetting() {
  const [themePreference, setThemePreference] = useUserThemePreference();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.Light)}>
        <View style={styles.settingRow}>
          <Text>
            Light {themePreference === ThemePreference.Light && '(selected)'}
          </Text>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.Dark)}>
        <View style={styles.settingRow}>
          <Text>
            Dark {themePreference === ThemePreference.Dark && '(selected)'}
          </Text>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.System)}>
        <View style={styles.settingRow}>
          <Text>
            Same as system{' '}
            {themePreference === ThemePreference.System && '(selected)'}
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
