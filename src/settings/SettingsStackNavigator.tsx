import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Settings } from './Settings';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeSetting } from './screens/ThemeSetting';
import { UnitSetting } from './screens/UnitSetting';

const SettingsStack = createNativeStackNavigator();

export function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerRight: HeaderRight }}
      />
      <SettingsStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <SettingsStack.Screen name="UnitSetting" component={UnitSetting} />
    </SettingsStack.Navigator>
  );
}

function HeaderRight() {
  const navigation = useNavigation();

  return <Button title="Done" onPress={() => navigation.goBack()} />;
}
