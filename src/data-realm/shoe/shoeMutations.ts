import Realm from 'realm';
import uuid from 'react-native-uuid';
import { Shoe, ShoeProps } from './shoeModel';

export function addShoe(newShoeProps: ShoeProps, realm: Realm) {
  realm.write(() => {
    realm.create('Shoe', {
      ...newShoeProps,
      _id: uuid.v4().toString(),
    });
  });
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

export function deleteRun(shoe: Shoe, realm: Realm) {
  realm.write(() => {
    realm.delete(shoe);
  });
}
