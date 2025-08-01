import { Tabs } from 'expo-router';
import { RotateCcw, Briefcase, Heart } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#D4A574',
          borderTopWidth: 0,
          paddingBottom: 15,
          paddingTop: 15,
          height: 70,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 6,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="refused"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <RotateCcw size={size + 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Briefcase size={size + 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="chosen"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size + 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}