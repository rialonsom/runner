import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RunsStackScreenProps } from '../main-tab-navigator';
import { getRunDisplayData } from '../utils';
import { RunnerText } from '../ui-components';
import { RunnerSecondaryText } from '../ui-components/RunnerSecondaryText';
import { ThemeContext } from '../theme';
import { useUserUnitPreference } from '../user-preferences';
import { Run } from '../data-realm/run/runModel';

export const RunListRow = React.memo(function RunListRow(props: {
  run: Run;
  index: number;
  navigation: RunsStackScreenProps['navigation'];
}) {
  const { theme } = useContext(ThemeContext);
  const [unitPreference] = useUserUnitPreference();
  const runDisplayData = getRunDisplayData(props.run, unitPreference);

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('RunDetail', { runId: props.run._id })
      }>
      <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
        <RunnerText style={styles.distance}>
          {runDisplayData.distance}
        </RunnerText>
        <RunnerSecondaryText>{runDisplayData.date}</RunnerSecondaryText>
      </View>
    </TouchableOpacity>
  );
});

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
  distance: {
    fontSize: 24,
  },
});
