import React from 'react';
import {NewAppScreen} from '../new-app-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RunList} from '../run-list';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Summary} from '../summary';
import {RunDetail} from '../run-detail';

const MainTab = createBottomTabNavigator();

const RunsStack = createNativeStackNavigator();
function RunsStackScreen() {
  return (
    <RunsStack.Navigator initialRouteName="RunList">
      <RunsStack.Screen name="NewAppScreen" component={NewAppScreen} />
      <RunsStack.Screen name="RunList" component={RunList} />
      <RunsStack.Screen name="RunDetail" component={RunDetail} />
    </RunsStack.Navigator>
  );
}

const SummaryStack = createNativeStackNavigator();
function SummaryStackScreen() {
  return (
    <SummaryStack.Navigator initialRouteName="">
      <SummaryStack.Screen name="Summary" component={Summary} />
    </SummaryStack.Navigator>
  );
}

export function MainTabNavigator() {
  return (
    <MainTab.Navigator screenOptions={{headerShown: false}}>
      <MainTab.Screen name="RunsTab" component={RunsStackScreen} />
      <MainTab.Screen name="SummaryTab" component={SummaryStackScreen} />
    </MainTab.Navigator>
  );
}
