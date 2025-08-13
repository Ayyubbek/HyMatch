import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface InfoButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: any;
}

export function InfoButton({ onPress, style }: InfoButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.infoButton, style]}>
      <FontAwesomeIcon icon={faInfoCircle} size={12} color="#1E90FF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  infoButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c29c70',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
