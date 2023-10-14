import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type RunnerInputRowProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
};

export function RunnerInputRow(props: RunnerInputRowProps) {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={!!props.disabled}>
      <View style={[styles.container]}>{props.children}</View>
    </TouchableOpacity>
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
