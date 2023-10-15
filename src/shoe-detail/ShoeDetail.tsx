import React, { useContext } from 'react';
import { RunnerDivider } from '../ui-components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ShoesStackParamList } from '../main-tab-navigator';
import { useShoe } from '../data-realm/shoe/shoeHooks';
import { Button, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../theme';
import { ShoeDetailRow } from './ShoeDetailRow';
import { getShoeDisplayData } from '../utils';
import { useUserUnitPreference } from '../user-preferences';

export function ShoeDetail() {
  const route = useRoute<RouteProp<ShoesStackParamList, 'ShoeDetail'>>();
  const { theme } = useContext(ThemeContext);
  const [unitPreference] = useUserUnitPreference();
  const { shoeId } = route.params;

  const shoe = useShoe(shoeId);
  const shoeDisplayData = shoe && getShoeDisplayData(shoe, unitPreference);

  const onPressDelete = () => {};

  return (
    <View>
      <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
        <ShoeDetailRow attribute="Brand" value={shoeDisplayData?.brand} />
        <RunnerDivider />
        <ShoeDetailRow attribute="Name" value={shoeDisplayData?.name} />
        <RunnerDivider />
        <ShoeDetailRow
          attribute="Start date"
          value={shoeDisplayData?.startDate}
        />
        <RunnerDivider />
        {shoeDisplayData?.endDate && (
          <>
            <ShoeDetailRow
              attribute="End date"
              value={shoeDisplayData?.endDate}
            />
            <RunnerDivider />
          </>
        )}

        <ShoeDetailRow attribute="Lifespan" value={shoeDisplayData?.lifespan} />
      </View>
      <Button
        title="Delete"
        color={theme.colors.danger}
        onPress={onPressDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
});
