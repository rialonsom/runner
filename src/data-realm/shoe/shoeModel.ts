import Realm from 'realm';

export class Shoe extends Realm.Object<Shoe> {
  _id!: string;
  brand!: string;
  name!: string;
  startDate!: Date;
  endDate?: Date;
  lifespanMeters!: number;

  static schema = {
    name: 'Shoe',
    properties: {
      _id: 'string',
      name: 'string',
      startDate: 'date',
      endDate: 'date?',
      lifespanMeters: 'int',
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
