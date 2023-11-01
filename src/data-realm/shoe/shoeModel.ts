import Realm from 'realm';
import { Run } from '../run/runModel';

export class Shoe extends Realm.Object<Shoe> {
  _id!: string;
  brand!: string;
  name!: string;
  startDate!: Date;
  endDate?: Date;
  lifespanMeters!: number;
  runs!: Realm.List<Run>;

  static schema = {
    name: 'Shoe',
    properties: {
      _id: 'string',
      brand: 'string',
      name: 'string',
      startDate: 'date',
      endDate: 'date?',
      lifespanMeters: 'int',
      runs: 'Run[]',
    },
    primaryKey: '_id',
  };
}

export type ShoeProps = {
  brand: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  lifespanMeters: number;
};
