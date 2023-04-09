/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NewAppScreen } from './src/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RunList } from './src/runlist';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Summary } from './src/summary';


const Tab = createBottomTabNavigator();

const RunsStack = createNativeStackNavigator();
function RunsStackScreen() {
  return (
    <RunsStack.Navigator initialRouteName='RunList'>
      <RunsStack.Screen name="NewAppScreen" component={NewAppScreen} />
      <RunsStack.Screen name="RunList" component={RunList} />
    </RunsStack.Navigator>
  )
}

const SummaryStack = createNativeStackNavigator();
function SummaryStackScreen() {
  return (
    <SummaryStack.Navigator initialRouteName=''>
      <SummaryStack.Screen name="Summary" component={Summary}/>
    </SummaryStack.Navigator>
  )
}


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name='RunsTab' component={RunsStackScreen} />
        <Tab.Screen name='SummaryTab' component={SummaryStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
