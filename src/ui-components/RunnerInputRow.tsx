import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type RunnerInputRowProps = {
  children: React.ReactNode;
  onPress?: () => void;
};

export function RunnerInputRow(props: RunnerInputRowProps) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={[styles.container]}>{props.children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
});
