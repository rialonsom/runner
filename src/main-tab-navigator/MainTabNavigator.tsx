import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RunList, RunListHeaderRight } from '../run-list';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Summary } from '../summary';
import { RunDetail, RunDetailHeaderRight } from '../run-detail';
import {
  MainTabParamList,
  RunsStackParamList,
  SummaryStackParamList,
  TabBarIconProps,
} from './types';
import { MainTabNavigatorHeaderLeft } from './MainTabNavigatorHeaderLeft';
import RunsIcon from '../../assets/run-icon.svg';
import SummaryIcon from '../../assets/summary-icon.svg';

const RunsStack = createNativeStackNavigator<RunsStackParamList>();
function RunsStackNavigator() {
  return (
    <RunsStack.Navigator initialRouteName="RunList">
      <RunsStack.Screen
        name="RunList"
        component={RunList}
        options={{
          headerLeft: MainTabNavigatorHeaderLeft,
          headerRight: RunListHeaderRight,
          title: 'My runs',
        }}
      />
      <RunsStack.Screen
        name="RunDetail"
        component={RunDetail}
        options={{
          title: 'Run details',
          headerRight: RunDetailHeaderRight,
        }}
      />
    </RunsStack.Navigator>
  );
}

const SummaryStack = createNativeStackNavigator<SummaryStackParamList>();
function SummaryStackNavigator() {
  return (
    <SummaryStack.Navigator initialRouteName="Summary">
      <SummaryStack.Screen
        name="Summary"
        component={Summary}
        options={{ headerLeft: MainTabNavigatorHeaderLeft }}
      />
    </SummaryStack.Navigator>
  );
}

const MainTab = createBottomTabNavigator<MainTabParamList>();
export function MainTabNavigator() {
  const runsTabIcon = ({ color, size }: TabBarIconProps) => (
    <RunsIcon width={size} height={size} fill={color} stroke={color} />
  );
  const summaryTabIcon = ({ color, size }: TabBarIconProps) => (
    <SummaryIcon width={size} height={size} fill={color} stroke={color} />
  );

  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen
        name="RunsTab"
        component={RunsStackNavigator}
        options={{ title: 'My runs', tabBarIcon: runsTabIcon }}
      />
      <MainTab.Screen
        name="SummaryTab"
        component={SummaryStackNavigator}
        options={{ title: 'Summary', tabBarIcon: summaryTabIcon }}
      />
    </MainTab.Navigator>
  );
}
