import { NativeModules } from 'react-native';

const { HealthkitImportModule } = NativeModules;

interface HealthkitImportInterface {
  add(a: number, b: number): Promise<number>;
}

export default HealthkitImportModule as HealthkitImportInterface;
