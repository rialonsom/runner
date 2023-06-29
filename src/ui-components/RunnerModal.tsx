import React from 'react';
import { Modal, ModalProps, StyleSheet, View } from 'react-native';

export type RunnerModalProps = ModalProps & {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

export function RunnerModal(props: RunnerModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.setIsVisible(!props.isVisible);
      }}>
      <View style={styles.modalContainer}>{props.children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
