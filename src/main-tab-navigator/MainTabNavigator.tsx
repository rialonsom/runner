import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RunList, RunListHeaderRight } from '../run-list';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Summary } from '../summary';
import { RunDetail, RunDetailHeaderRight } from '../run-detail';
import {
  MainTabParamList,
  RunsStackParamList,
  ShoesStackParamList,
  SummaryStackParamList,
  TabBarIconProps,
} from './types';
import { MainTabNavigatorHeaderLeft } from './MainTabNavigatorHeaderLeft';
import RunsIcon from '../../assets/run-icon.svg';
import SummaryIcon from '../../assets/summary-icon.svg';
import ShoesIcon from '../../assets/shoe-icon.svg';
import { ShoeList } from '../shoe-list';
import { ShoeListHeaderRight } from '../shoe-list';
import { ShoeDetail, ShoeDetailHeaderRight } from '../shoe-detail';

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

const ShoesStack = createNativeStackNavigator<ShoesStackParamList>();
function ShoesStackNavigator() {
  return (
    <ShoesStack.Navigator initialRouteName="ShoeList">
      <ShoesStack.Screen
        name="ShoeList"
        component={ShoeList}
        options={{
          headerLeft: MainTabNavigatorHeaderLeft,
          headerRight: ShoeListHeaderRight,
          title: 'My shoes',
        }}
      />
      <ShoesStack.Screen
        name="ShoeDetail"
        component={ShoeDetail}
        options={{
          title: 'Shoe details',
          headerRight: ShoeDetailHeaderRight,
        }}
      />
    </ShoesStack.Navigator>
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
  const shoesTabIcon = ({ color, size }: TabBarIconProps) => (
    <ShoesIcon width={size} height={size} fill={color} stroke={color} />
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
      <MainTab.Screen
        name="ShoesTab"
        component={ShoesStackNavigator}
        options={{ title: 'My shoes', tabBarIcon: shoesTabIcon }}
      />
    </MainTab.Navigator>
  );
}
