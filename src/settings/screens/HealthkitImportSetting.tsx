import React, { useCallback, useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../../theme';
import { RunnerModal, RunnerText } from '../../ui-components';
import HealthkitImportModule from '../../run-healthkit-import/HealthkitImportModule';
import { getRunsPropsFromHealthkitRuns } from '../../run-healthkit-import';
import {
  addImportedRuns,
  deleteImportedRunsFromSource,
} from '../../data-realm/run/runMutations';
import { useRealm } from '../../data-realm/RealmProvider';
import { useUserImportedHealthkitRunsPreference } from '../../user-preferences';
import { RunSource } from '../../data-realm/run/runModel';

export function HealthkitImportSetting() {
  const realm = useRealm();
  const { theme } = useContext(ThemeContext);
  const [importedhealthkitRunsPreference, setImportedHealhkitRunsPreference] =
    useUserImportedHealthkitRunsPreference();

  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const importRuns = useCallback(async () => {
    const isHealthkitAvailable = await HealthkitImportModule.isAvailable();

    if (!isHealthkitAvailable) {
      Alert.alert(
        'No runs were imported.',
        'Healthkit is not available on your device.',
      );
      return;
    }

    await HealthkitImportModule.requestAuthorization();

    setLoadingModalVisible(true);

    const healthkitRuns = await HealthkitImportModule.fetchRuns();

    if (healthkitRuns.length === 0) {
      setLoadingModalVisible(false);
      Alert.alert(
        'No runs were imported.',
        "You either don't have any running workouts registered in Apple Fitness or didn't allow Runner to access your workout data (you can change this in settings).",
      );
      return;
    }

    const importedRuns = getRunsPropsFromHealthkitRuns(healthkitRuns);

    addImportedRuns(importedRuns, realm);
    setImportedHealhkitRunsPreference(true);
    setLoadingModalVisible(false);

    Alert.alert(
      'Success',
      'Your Apple Fitness runs have been imported successfully.',
    );
  }, [realm, setImportedHealhkitRunsPreference]);

  const deleteImportedRuns = useCallback(() => {
    deleteImportedRunsFromSource(RunSource.Healthkit, realm);
    setImportedHealhkitRunsPreference(false);
    Alert.alert(
      'Success',
      'Your Apple Fitness imported runs have been deleted sucessfully.',
    );
  }, [realm, setImportedHealhkitRunsPreference]);

  return (
    <>
      <RunnerModal
        isVisible={loadingModalVisible}
        setIsVisible={setLoadingModalVisible}>
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" />
        </View>
      </RunnerModal>
      <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
        {!importedhealthkitRunsPreference ? (
          <TouchableOpacity onPress={importRuns}>
            <View style={styles.settingRow}>
              <RunnerText style={{ color: theme.colors.primary }}>
                Import runs
              </RunnerText>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={deleteImportedRuns}>
            <View style={styles.settingRow}>
              <RunnerText style={{ color: 'red' }}>
                Delete imported runs
              </RunnerText>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    paddingVertical: 10,
  },
  settingRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
  },
  loadingModal: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
  },
});
