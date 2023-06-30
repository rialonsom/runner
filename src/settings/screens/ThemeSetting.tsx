import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RunnerDivider, RunnerText } from '../../ui-components';
import {
  ThemePreference,
  useUserThemePreference,
} from '../../user-preferences';
import { ThemeContext } from '../../theme';
import Checkmark from '../../../assets/checkmark-icon.svg';

export function ThemeSetting() {
  const { theme } = useContext(ThemeContext);
  const [themePreference, setThemePreference] = useUserThemePreference();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.Light)}>
        <View style={styles.settingRow}>
          <RunnerText>Light </RunnerText>
          {themePreference === ThemePreference.Light && (
            <Checkmark fill={theme.colors.primary} width={18} height={18} />
          )}
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.Dark)}>
        <View style={styles.settingRow}>
          <RunnerText>Dark</RunnerText>
          {themePreference === ThemePreference.Dark && (
            <Checkmark fill={theme.colors.primary} width={18} height={18} />
          )}
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity
        onPress={() => setThemePreference(ThemePreference.System)}>
        <View style={styles.settingRow}>
          <RunnerText>Same as system</RunnerText>
          {themePreference === ThemePreference.System && (
            <Checkmark fill={theme.colors.primary} width={18} height={18} />
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
