import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RunnerSecondaryText, RunnerText } from '.';

export type RunnerStatRowProps = {
  stat: string;
  value?: string;
};

export function RunnerStatRow(props: RunnerStatRowProps) {
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
    fontWeight: '200',
  },
  value: {
    fontSize: 20,
  },
});
