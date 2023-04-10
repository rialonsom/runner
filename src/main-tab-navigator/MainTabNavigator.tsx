import React from 'react';
import { NewAppScreen } from '../new-app-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RunList, RunListHeaderLeft } from '../run-list';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Summary } from '../summary';
import { RunDetail } from '../run-detail';
import {
  MainTabParamList,
  RunsStackParamList,
  SummaryStackParamList,
} from './types';

const RunsStack = createNativeStackNavigator<RunsStackParamList>();
function RunsStackScreen() {
  return (
    <RunsStack.Navigator initialRouteName="RunList">
      <RunsStack.Screen name="NewAppScreen" component={NewAppScreen} />
      <RunsStack.Screen
        name="RunList"
        component={RunList}
        options={{ headerLeft: RunListHeaderLeft }}
      />
      <RunsStack.Screen name="RunDetail" component={RunDetail} />
    </RunsStack.Navigator>
  );
}

const SummaryStack = createNativeStackNavigator<SummaryStackParamList>();
function SummaryStackScreen() {
  return (
    <SummaryStack.Navigator initialRouteName="Summary">
      <SummaryStack.Screen name="Summary" component={Summary} />
    </SummaryStack.Navigator>
  );
}

const MainTab = createBottomTabNavigator<MainTabParamList>();
export function MainTabNavigator() {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen name="RunsTab" component={RunsStackScreen} />
      <MainTab.Screen name="SummaryTab" component={SummaryStackScreen} />
    </MainTab.Navigator>
  );
}
