import Realm from 'realm';
import uuid from 'react-native-uuid';
import { ImportedRunProps, Run, RunProps, RunSource } from './runModel';

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

export function addImportedRuns(
  importedRuns: ImportedRunProps[],
  realm: Realm,
) {
  realm.write(() => {
    importedRuns.forEach(runProps => {
      realm.create('Run', {
        ...runProps,
        _id: uuid.v4().toString(),
      });
    });
  });
}

export function deleteImportedRunsFromSource(source: RunSource, realm: Realm) {
  const runs = realm.objects('Run');

  const runsFromSource = runs.filtered('source == $0', source);

  realm.write(() => {
    runsFromSource.forEach(run => {
      realm.delete(run);
    });
  });
}
