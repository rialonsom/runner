import { NavigatorScreenParams } from '@react-navigation/native';
import { MainTabParamList } from '../main-tab-navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabNavigator: NavigatorScreenParams<MainTabParamList>;
  RunCreation?: { runId: string };
  SettingsStack: undefined;
};

export type RootStackScreenProps = NativeStackScreenProps<RootStackParamList>;
