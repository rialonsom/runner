import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../theme';

export function ShoeListEmptyState() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.secondaryText }}>
        You have no shoes, add one by tapping +
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
