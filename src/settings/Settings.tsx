import React from 'react';
import { useUserDummyPreference } from '../user-preferences';
import { StyleSheet, Switch, View } from 'react-native';

export function Settings() {
  const [dummyValue, setDummyValue] = useUserDummyPreference();

  const toggleSwitch = () => setDummyValue(!dummyValue);

  return (
    <View style={styles.container}>
      <Switch value={dummyValue} onValueChange={toggleSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
