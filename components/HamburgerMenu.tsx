import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faUser,
  faSignOutAlt,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
// removed unused user and LinearGradient imports

const SCREEN_WIDTH = Dimensions.get('window').width;

interface HamburgerMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ isVisible, onClose }: HamburgerMenuProps) {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  ];

  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.8)).current;
  const [isMenuRendered, setIsMenuRendered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMenuRendered(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH * 0.8,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setIsMenuRendered(false));
    }
  }, [isVisible]);

  const handleProfilePress = () => {
    onClose();
    router.push('/profile');
  };

  if (!isMenuRendered) return null;

  return (
    <View
      style={styles.absoluteFill}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
      >
        <View style={styles.menuContent}>
          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleProfilePress}
            >
              <View style={styles.menuIconContainer}>
                <FontAwesomeIcon icon={faUser} size={18} color={'#1E90FF'} />
              </View>
              <Text style={styles.menuItemText}>{t('tabs.profile')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.languageSection}>
            <Text style={styles.sectionTitle}>{t('menu.language')}</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  language === lang.code && styles.languageOptionActive,
                ]}
                onPress={() => setLanguage(lang.code as any)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text
                  style={[
                    styles.languageName,
                    language === lang.code && styles.languageNameActive,
                  ]}
                >
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <View style={styles.languageCheck}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  menu: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '80%',
    maxWidth: 300,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,

    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerGradient: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingBottom: 10,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

    color: '#ffffff',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c29c70',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#c29c70',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#e0e7ff',
  },
  guestSection: {
    alignItems: 'center',
  },
  guestText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e0e7ff',
    marginTop: 6,
  },
  menuContent: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  menuItems: {
    paddingHorizontal: 20,
    marginBottom: 24,
    paddingTop: 10,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c29c70',
    backgroundColor: '#ffffff',
    marginBottom: 6,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c29c70',
    backgroundColor: '#f8f1e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,

    fontWeight: 'bold',
    color: '#333333',
  },
  languageSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#c29c70',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c29c70',
    backgroundColor: '#ffffff',
    marginBottom: 6,
  },
  languageOptionActive: {
    backgroundColor: '#f8f1e9',
    borderColor: '#1E90FF',
  },
  languageFlag: {
    fontSize: 18,
    marginRight: 12,
  },
  languageName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  languageNameActive: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  languageCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bottomSection: {
    marginTop: 'auto',
    paddingHorizontal: 20,
  },
});
