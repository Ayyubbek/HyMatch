import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ChefHat, Truck, Package, Chrome as Home, Store, Utensils, Briefcase, HardHat } from 'lucide-react-native';

interface JobTypeIconProps {
  type: string;
  size?: number;
}

export function JobTypeIcon({ type, size = 64 }: JobTypeIconProps) {
  const iconSize = size * 0.5;

  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'cooking':
        return <ChefHat size={iconSize} color="#ffffff" />;
      case 'delivery':
        return <Truck size={iconSize} color="#ffffff" />;
      case 'warehouse':
        return <Package size={iconSize} color="#ffffff" />;
      case 'cleaning':
        return <Home size={iconSize} color="#ffffff" />;
      case 'retail':
        return <Store size={iconSize} color="#ffffff" />;
      case 'restaurant':
        return <Utensils size={iconSize} color="#ffffff" />;
      case 'office':
        return <Briefcase size={iconSize} color="#ffffff" />;
      case 'construction':
        return <HardHat size={iconSize} color="#ffffff" />;
      default:
        return <Briefcase size={iconSize} color="#ffffff" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type.toLowerCase()) {
      case 'cooking':
        return '#F97316';
      case 'delivery':
        return '#10B981';
      case 'warehouse':
        return '#8B5CF6';
      case 'cleaning':
        return '#06B6D4';
      case 'retail':
        return '#EF4444';
      case 'restaurant':
        return '#F59E0B';
      case 'office':
        return '#3B82F6';
      case 'construction':
        return '#64748B';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: getBackgroundColor(),
        width: size,
        height: size,
        borderRadius: size / 2,
      }
    ]}>
      {getIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});