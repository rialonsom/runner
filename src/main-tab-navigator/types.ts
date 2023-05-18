import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackScreenProps } from '../root-stack-navigator';

// Runs stack navigation
export type RunsStackParamList = {
  NewAppScreen: undefined;
  RunList: undefined;
  RunDetail: { runId: string };
};
export type RunsStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RunsStackParamList>,
  MainTabScreenProps
>;

// Summary stack navigation
export type SummaryStackParamList = {
  Summary: undefined;
};
export type SummaryStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SummaryStackParamList>,
  MainTabScreenProps
>;

// Main tab navigation
export type MainTabParamList = {
  RunsTab: NavigatorScreenParams<RunsStackParamList>;
  SummaryTab: NavigatorScreenParams<SummaryStackParamList>;
};
export type MainTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList>,
  RootStackScreenProps
>;

export type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
