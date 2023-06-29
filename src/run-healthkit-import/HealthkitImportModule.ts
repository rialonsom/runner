import { NativeModules } from 'react-native';
import { HealthkitRun } from './types';

const { HealthkitImportModule } = NativeModules;

interface HealthkitImportInterface {
  isAvailable(): Promise<boolean>;
  requestAuthorization(): Promise<void>;
  fetchRuns(): Promise<Array<HealthkitRun>>;
}

export default HealthkitImportModule as HealthkitImportInterface;
