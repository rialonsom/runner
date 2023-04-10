import { NavigatorScreenParams } from '@react-navigation/native';
import { MainTabParamList } from '../main-tab-navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabNavigator: NavigatorScreenParams<MainTabParamList>;
  RunCreation: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
