import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackScreenProps } from '../root-stack-navigator';

export type SettingsStackParamList = {
  Settings: undefined;
  ThemeSetting: undefined;
  UnitSetting: undefined;
  HealthkitImportSetting: undefined;
};

export type SettingsStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList>,
  RootStackScreenProps
>;
