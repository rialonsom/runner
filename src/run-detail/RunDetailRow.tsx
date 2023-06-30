import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RunnerSecondaryText, RunnerText } from '../ui-components';

export type RunDetailRowProps = {
  stat: string;
  value?: string;
};

export function RunDetailRow(props: RunDetailRowProps) {
  return (
    <View style={styles.container}>
      <RunnerSecondaryText style={styles.title}>
        {props.stat}
      </RunnerSecondaryText>
      <RunnerText style={styles.value}>{props.value}</RunnerText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '300',
  },
  value: {
    fontSize: 20,
  },
});
