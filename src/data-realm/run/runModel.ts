import Realm from 'realm';

export class Run extends Realm.Object<Run> {
  _id!: Realm.BSON.ObjectId;
  durationSeconds!: number;
  distanceMeters!: number;
  date!: Date;

  static schema = {
    name: 'Run',
    properties: {
      _id: 'objectId',
      durationSeconds: 'int',
      distanceMeters: 'int',
      date: 'date',
    },
    primaryKey: '_id',
  };
}

export type RunProps = {
  durationSeconds: number;
  distanceMeters: number;
  date: Date;
};
