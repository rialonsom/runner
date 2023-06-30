import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { RunnerDivider } from '../../ui-components';
import {
  ThemePreference,
  useUserThemePreference,
} from '../../user-preferences';
import { ThemeContext } from '../../theme';
import { SelectableSettingsRow } from '../SelectableSettingsRow';

export function ThemeSetting() {
  const { theme } = useContext(ThemeContext);
  const [themePreference, setThemePreference] = useUserThemePreference();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <SelectableSettingsRow
        preferenceName="Light"
        isSelected={themePreference === ThemePreference.Light}
        onPress={() => setThemePreference(ThemePreference.Light)}
      />
      <RunnerDivider />
      <SelectableSettingsRow
        preferenceName="Dark"
        isSelected={themePreference === ThemePreference.Dark}
        onPress={() => setThemePreference(ThemePreference.Dark)}
      />
      <RunnerDivider />
      <SelectableSettingsRow
        preferenceName="Same as system"
        isSelected={themePreference === ThemePreference.System}
        onPress={() => setThemePreference(ThemePreference.System)}
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
