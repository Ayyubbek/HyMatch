import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Phone, Mail, FileHeart, ThumbsDown } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { View, TouchableOpacity } from 'react-native';
import { ContactModal } from '@/components/ContactModal';

export default function TabLayout() {
  const { t } = useLanguage();
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  const handleContactTabPress = () => {
    setIsContactModalVisible(true);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#D4A574',
            borderTopWidth: 0,
            paddingBottom: 10,
            paddingTop: 10,
            height: 80,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 20,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: 'hidden', // radius ishlashi uchun kerak
            zIndex: 3000,
          },
          tabBarLabelStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 11,
            marginTop: 3,
          },
          tabBarActiveTintColor: '#3B2F20',
          tabBarInactiveTintColor: '#B08C6B',
        }}
      >
        <Tabs.Screen
          name="refused"
          options={{
            title: '',
            tabBarIcon: ({ size, color, focused }) => (
              <View
                style={{
                  backgroundColor: focused ? '#FFD4A3' : '#F0E0C0',
                  borderRadius: 16,
                  padding: 12,
                  shadowColor: focused ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  elevation: focused ? 8 : 0,
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              >
                <ThumbsDown
                  size={size - 2}
                  color={focused ? '#3B2F20' : '#B08C6B'}
                  strokeWidth={focused ? 2.8 : 2.2}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ size, color, focused }) => (
              <TouchableOpacity
                onPress={handleContactTabPress}
                style={{
                  backgroundColor: focused ? '#FFD4A3' : '#F0E0C0',
                  borderRadius: 16,
                  padding: 12,
                  shadowColor: focused ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: focused ? 8 : 0,
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Phone
                    size={size - 4}
                    color={focused ? '#3B2F20' : '#B08C6B'}
                    strokeWidth={focused ? 2.6 : 2}
                  />
                  <Mail
                    size={size - 4}
                    color={focused ? '#3B2F20' : '#B08C6B'}
                    strokeWidth={focused ? 2.6 : 2}
                    style={{ marginLeft: 2 }}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="chosen"
          options={{
            title: '',
            tabBarIcon: ({ size, color, focused }) => (
              <View
                style={{
                  backgroundColor: focused ? '#FFD4A3' : '#F0E0C0',
                  borderRadius: 16,
                  padding: 12,
                  shadowColor: focused ? '#000' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: focused ? 8 : 0,
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              >
                <FileHeart
                  size={size - 2}
                  color={focused ? '#3B2F20' : '#B08C6B'}
                  strokeWidth={focused ? 2.8 : 2.2}
                />
              </View>
            ),
          }}
        />
      </Tabs>

      <ContactModal
        visible={isContactModalVisible}
        onClose={() => setIsContactModalVisible(false)}
      />
    </>
  );
}
