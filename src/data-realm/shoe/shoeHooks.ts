import { useObject, useQuery } from '../RealmProvider';
import { Shoe } from './shoeModel';

export function useShoes(): Shoe[] {
  const shoes = useQuery(Shoe);
  const shoesByDateDescending = shoes.sorted('startDate', true);

  return Array.from(shoesByDateDescending);
}

export function useShoe(_id: string): Shoe | null {
  const shoe = useObject(Shoe, _id);

  return shoe;
}
