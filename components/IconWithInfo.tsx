import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { InfoButton } from './InfoButton';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconWithInfoProps {
  icon: IconDefinition;
  size: number;
  color: string;
  infoText: string;
  onPress?: () => void;
  style?: any;
}

export function IconWithInfo({ icon, size, color, infoText, onPress, style }: IconWithInfoProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.iconContainer, style]}>
        <View style={styles.iconCircleLarge}>
          <FontAwesomeIcon icon={icon} size={size} color={color} />
        </View>
        <InfoButton onPress={onPress} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  iconCircleLarge: {
    borderWidth: 1,
    borderColor: '#c29c70',
    borderRadius: 50,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
