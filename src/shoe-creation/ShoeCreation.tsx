import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackScreenProps } from '../root-stack-navigator';
import { ThemeContext } from '../theme';

export function ShoeCreation() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RootStackScreenProps['navigation']>();

  const isEdit = false;
  const onPressDone = useCallback(() => {}, []);

  useEffect(() => {
    const headerLeft = () => (
      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
        color={theme.colors.danger}
      />
    );
    const headerRight = () => (
      <Button
        title={isEdit ? 'Done' : 'Add'}
        onPress={onPressDone}
        color={theme.colors.primary}
      />
    );
    const title = isEdit ? 'Edit shoe' : 'New shoe';
    navigation.setOptions({ title, headerLeft, headerRight });
  }, [isEdit, navigation, onPressDone, theme.colors]);

  return (
    <View>
      <Text>Shoe creation screen</Text>
    </View>
  );
}
