import Realm from 'realm';
import { Shoe } from '../shoe/shoeModel';

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
  shoe!: Shoe[];

  static schema = {
    name: 'Run',
    properties: {
      _id: 'string',
      durationSeconds: 'int',
      distanceMeters: 'int',
      date: 'date',
      source: 'string',
      shoe: {
        type: 'linkingObjects',
        objectType: 'Shoe',
        property: 'runs',
      },
    },
    primaryKey: '_id',
  };
}

export type RunProps = {
  durationSeconds: number;
  distanceMeters: number;
  date: Date;
};

export type ImportedRunProps = RunProps & {
  source: RunSource;
};
