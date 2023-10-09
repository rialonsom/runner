import Realm from 'realm';
import { Shoe } from './shoeModel';

export function getShoe(_id: string, realm: Realm): Shoe | null {
  const shoe = realm.objectForPrimaryKey<Shoe>('Shoe', _id);

  return shoe;
}
