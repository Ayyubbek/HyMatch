import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SwipeCards } from '@/components/SwipeCards';

import { Menu, SlidersHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Menu size={22} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('home.title')}</Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/filter')}
          >
            <SlidersHorizontal size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <SwipeCards />
      </View>

      <HamburgerMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D4A574',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'black',

    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
