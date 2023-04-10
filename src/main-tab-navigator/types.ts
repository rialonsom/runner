import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackNavigationProp } from '../root-stack-navigator';

// Runs stack navigation
export type RunsStackParamList = {
  NewAppScreen: undefined;
  RunList: undefined;
  RunDetail: undefined;
};
export type RunsStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RunsStackParamList>,
  MainTabNavigationProp
>;

// Summary stack navigation
export type SummaryStackParamList = {
  Summary: undefined;
};
export type SummaryStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SummaryStackParamList>,
  MainTabNavigationProp
>;

// Main tab navigation
export type MainTabParamList = {
  RunsTab: NavigatorScreenParams<RunsStackParamList>;
  SummaryTab: NavigatorScreenParams<SummaryStackParamList>;
};
export type MainTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  RootStackNavigationProp
>;
