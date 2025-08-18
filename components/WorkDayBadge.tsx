import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorkDayBadgeProps {
  day: string;
  size?: 'small' | 'normal';
}

export function WorkDayBadge({ day, size = 'normal' }: WorkDayBadgeProps) {
  const { t } = useLanguage();
  const isWeekend = day === 'Sat' || day === 'Sun';
  const isSmall = size === 'small';

  const getGradientColors = () => {
    if (isWeekend) {
      return ['#FEE2E2', '#FECACA'];
    }
    return ['#EEF2FF', '#E0E7FF'];
  };

  const getTextColor = () => {
    if (isWeekend) {
      return '#DC2626';
    }
    return '#4F46E5';
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.badge, isSmall && styles.smallBadge]}
    >
      <Text
        style={[
          styles.text,
          isSmall && styles.smallText,
          { color: getTextColor() },
        ]}
      >
        {(() => {
          const map: Record<string, string> = {
            Mon: t('weekday.short.mon'),
            Tue: t('weekday.short.tue'),
            Wed: t('weekday.short.wed'),
            Thu: t('weekday.short.thu'),
            Fri: t('weekday.short.fri'),
            Sat: t('weekday.short.sat'),
            Sun: t('weekday.short.sun'),
          };
          return map[day] || day;
        })()}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 11,
  },
});
