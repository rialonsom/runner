import Realm from 'realm';
import { Run, RunProps } from './runModel';

export function addRun(newRunProps: RunProps, realm: Realm) {
  realm.write(() => {
    realm.create('Run', {
      ...newRunProps,
      _id: new Realm.BSON.ObjectId(),
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
