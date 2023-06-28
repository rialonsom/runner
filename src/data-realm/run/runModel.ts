import Realm from 'realm';

export enum RunSource {
  Runner = 'runner',
  Healthkit = 'healthkit',
}

export class Run extends Realm.Object<Run> {
  _id!: string;
  durationSeconds!: number;
  distanceMeters!: number;
  date!: Date;
  source!: RunSource;

  static schema = {
    name: 'Run',
    properties: {
      _id: 'string',
      durationSeconds: 'int',
      distanceMeters: 'int',
      date: 'date',
      source: 'string',
    },
    primaryKey: '_id',
  };
}

export type RunProps = {
  durationSeconds: number;
  distanceMeters: number;
  date: Date;
};
