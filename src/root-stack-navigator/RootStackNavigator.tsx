import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainTabNavigator } from '../main-tab-navigator/MainTabNavigator';
import { RunCreation } from '../run-creation';

const RootStack = createNativeStackNavigator();

export function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="RunCreation" component={RunCreation} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
