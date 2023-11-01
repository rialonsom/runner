import Realm from 'realm';
import uuid from 'react-native-uuid';
import { Shoe, ShoeProps } from './shoeModel';
import { getRunsWithinDates } from '../run/runQueries';

export function addShoe(newShoeProps: ShoeProps, realm: Realm): string {
  const _id = uuid.v4().toString();

  realm.write(() => {
    realm.create('Shoe', {
      ...newShoeProps,
      _id,
    });
  });

  return _id;
}

export function updateShoe(shoe: Shoe, newShoeProps: ShoeProps, realm: Realm) {
  realm.write(() => {
    shoe.brand = newShoeProps.brand;
    shoe.name = newShoeProps.name;
    shoe.startDate = newShoeProps.startDate;
    shoe.endDate = newShoeProps.endDate;
    shoe.lifespanMeters = newShoeProps.lifespanMeters;
  });
}

export function deleteShoe(shoe: Shoe, realm: Realm) {
  realm.write(() => {
    realm.delete(shoe);
  });
}

export function applyShoeToRunsWithinDates(shoe: Shoe, realm: Realm) {
  if (!shoe.endDate) {
    return;
  }

  const { startDate, endDate } = shoe;
  const runs = getRunsWithinDates(startDate, endDate, realm);
  const runsWithoutShoe = runs.filter(run => !run.shoe[0]);

  realm.write(() => {
    shoe.runs.push(...runsWithoutShoe);
  });
}
