import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ShoesStackScreenProps } from '../main-tab-navigator';
import { ThemeContext } from '../theme';
import { RunnerSecondaryText, RunnerText } from '../ui-components';
import { Shoe } from '../data-realm/shoe/shoeModel';

export function ShoeListRow(props: {
  shoe: Shoe;
  index: number;
  navigation: ShoesStackScreenProps['navigation'];
}) {
  const { theme } = useContext(ThemeContext);

  const marginTop = props.index === 0 ? 8 : 0;

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('ShoeDetail');
      }}>
      <View
        style={[
          { backgroundColor: theme.colors.card, marginTop },
          styles.container,
        ]}>
        <RunnerText style={styles.shoeName}>{props.shoe.name}</RunnerText>
        <RunnerSecondaryText>{props.shoe.brand}</RunnerSecondaryText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 64,
    paddingHorizontal: 8,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 8,
  },
  shoeName: {
    fontSize: 24,
  },
});
