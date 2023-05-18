import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RunnerDivider, RunnerText } from '../../ui-components';
import {
  ThemePreference,
  useUserThemePreference,
} from '../../user-preferences';
import { ThemeContext } from '../../theme';

export function ThemeSetting() {
  const { theme } = useContext(ThemeContext);
  const [themePreference, setThemePreference] = useUserThemePreference();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.Light)}>
        <View style={styles.settingRow}>
          <RunnerText>
            Light {themePreference === ThemePreference.Light && '(selected)'}
          </RunnerText>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.Dark)}>
        <View style={styles.settingRow}>
          <RunnerText>
            Dark {themePreference === ThemePreference.Dark && '(selected)'}
          </RunnerText>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.System)}>
        <View style={styles.settingRow}>
          <RunnerText>
            Same as system{' '}
            {themePreference === ThemePreference.System && '(selected)'}
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
