import Realm from 'realm';
import uuid from 'react-native-uuid';
import { ImportedRunProps, Run, RunProps, RunSource } from './runModel';
import { Shoe } from '../shoe/shoeModel';

export function addRun(newRunProps: RunProps, realm: Realm): string {
  const _id = uuid.v4().toString();

  realm.write(() => {
    realm.create('Run', {
      ...newRunProps,
      _id,
      source: RunSource.Runner,
    });
  });

  return _id;
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

export function setRunShoe(run: Run, shoe: Shoe | undefined, realm: Realm) {
  const oldShoe = run.shoe[0];

  // Remove shoe
  if (oldShoe && !shoe) {
    const indexOfRun = oldShoe.runs.findIndex(
      shoeRun => shoeRun._id === run._id,
    );
    realm.write(() => {
      oldShoe.runs.splice(indexOfRun, 1);
    });
  }
  // Replace shoe
  if (oldShoe && shoe) {
    const indexOfRun = oldShoe.runs.findIndex(
      shoeRun => shoeRun._id === run._id,
    );
    realm.write(() => {
      oldShoe.runs.splice(indexOfRun, 1);
      shoe.runs.push(run);
    });
  }
  // Add shoe
  if (!oldShoe && shoe) {
    realm.write(() => {
      shoe.runs.push(run);
    });
  }
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
