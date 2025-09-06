import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import Animated from 'react-native-reanimated';

interface SwipeIndicatorProps {
  type: 'left' | 'right';
  style?: ViewStyle;
}

export function SwipeIndicator({ type, style }: SwipeIndicatorProps) {
  const isRight = type === 'right';
  const { t } = useLanguage();

  return (
    <Animated.View
      style={[
        styles.container,
        isRight ? styles.leftContainer : styles.rightContainer, // ← joyi almashtirilgan
        style,
      ]}
    >
      <View
        style={[
          styles.circle,
          isRight ? styles.chooseBorder : styles.refuseBorder,
        ]}
      >
        <Text
          style={[
            styles.text,
            isRight ? styles.chooseText : styles.refuseText,
            isRight ? styles.rotateChoose : styles.rotateRefuse,
          ]}
        >
          {isRight ? t('common.choose') : t('common.refuse')}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    pointerEvents: "none",
    top: '45%',
    zIndex: 100,
  },
  // Choose indicator views on right side
  leftContainer: {
    left: 20,
    transform: [{ translateY: -60 }],
  },
  // Refusal indicator views on left side
  rightContainer: {
    right: 20,
    transform: [{ translateY: -60 }],
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  chooseBorder: {
    borderColor: '#3DDC84',
  },
  refuseBorder: {
    borderColor: '#E53935',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
  chooseText: {
    color: '#3DDC84',
  },
  refuseText: {
    color: '#E53935',
  },
  rotateChoose: {
    transform: [{ rotate: '15deg' }],
  },
  rotateRefuse: {
    transform: [{ rotate: '-15deg' }],
  },
});
