import Realm from 'realm';
import uuid from 'react-native-uuid';
import { Run, RunProps, RunSource } from './runModel';

export function addRun(newRunProps: RunProps, realm: Realm) {
  realm.write(() => {
    realm.create('Run', {
      ...newRunProps,
      _id: uuid.v4().toString(),
      source: RunSource.Runner,
    });
  });
}

export function updateRun(run: Run, newRunProps: RunProps, realm: Realm) {
  realm.write(() => {
    run.durationSeconds = newRunProps.durationSeconds;
    run.distanceMeters = newRunProps.distanceMeters;
    run.date = newRunProps.date;
  });
}

export function deleteRun(run: Run, realm: Realm) {
  realm.write(() => {
    realm.delete(run);
  });
}
