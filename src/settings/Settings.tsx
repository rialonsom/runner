import React, { useContext } from 'react';
import {
  useUserThemePreference,
  useUserUnitPreference,
} from '../user-preferences';
import { Platform, StyleSheet, View } from 'react-native';
import { RunnerDivider } from '../ui-components';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackScreenProps } from './types';
import { ThemeContext } from '../theme';
import { SettingsRow } from './SettingsRow';

export function Settings() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<SettingsStackScreenProps['navigation']>();

  const [themePreference] = useUserThemePreference();
  const [unitPreference] = useUserUnitPreference();

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <SettingsRow
        preferenceName="Theme"
        preferenceValue={themePreference}
        onPress={() => navigation.navigate('ThemeSetting')}
      />
      <RunnerDivider />
      <SettingsRow
        preferenceName="Unit system"
        preferenceValue={unitPreference}
        onPress={() => navigation.navigate('UnitSetting')}
      />
      {Platform.OS === 'ios' && (
        <>
          <RunnerDivider />
          <SettingsRow
            preferenceName="Import runs from Apple Fitness"
            preferenceValue={''}
            onPress={() => navigation.navigate('HealthkitImportSetting')}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    paddingVertical: 10,
  },
});
