import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useShoes } from '../data-realm/shoe/shoeHooks';
import { Shoe } from '../data-realm/shoe/shoeModel';
import { ShoeListRow } from './ShoeListRow';
import { useNavigation } from '@react-navigation/native';
import { ShoesStackScreenProps } from '../main-tab-navigator';
import { ShoeListEmptyState } from './ShoeListEmptyState';

export function ShoeList() {
  const navigation = useNavigation<ShoesStackScreenProps['navigation']>();
  const shoes = useShoes();

  if (shoes.length === 0) {
    return <ShoeListEmptyState />;
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<Shoe>) => {
    const shoe = item;

    return <ShoeListRow shoe={shoe} index={index} navigation={navigation} />;
  };

  return <FlatList data={shoes} renderItem={renderItem} />;
}
