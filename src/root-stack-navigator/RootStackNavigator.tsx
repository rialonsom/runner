import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainTabNavigator } from '../main-tab-navigator/MainTabNavigator';
import { RunCreation } from '../run-creation';
import { SettingsStackNavigator } from '../settings';
import { ShoeCreation } from '../shoe-creation';

const RootStack = createNativeStackNavigator();

export function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
        />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{ presentation: 'containedModal', headerShown: true }}>
        <RootStack.Screen name="RunCreation" component={RunCreation} />
        <RootStack.Screen name="ShoeCreation" component={ShoeCreation} />
        <RootStack.Screen
          name="SettingsStack"
          component={SettingsStackNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
