import React from 'react';
import { useUserDummyPreference } from '../user-preferences';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { RunnerDivider } from '../ui-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackScreenProps } from './types';

export function Settings() {
  const navigation = useNavigation<SettingsStackScreenProps['navigation']>();
  const [dummyValue, setDummyValue] = useUserDummyPreference();

  const toggleSwitch = () => setDummyValue(!dummyValue);

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Text>Dummy setting</Text>
        <Switch value={dummyValue} onValueChange={toggleSwitch} />
      </View>
      <RunnerDivider />
      <TouchableOpacity onPress={() => navigation.navigate('ThemeSetting')}>
        <View style={styles.settingRow}>
          <Text>Theme</Text>
          <Text>Go</Text>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity onPress={() => navigation.navigate('UnitSetting')}>
        <View style={styles.settingRow}>
          <Text>Unit system</Text>
          <Text>Go</Text>
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
