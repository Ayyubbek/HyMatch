import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import { X, Mail, Phone } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ContactModal = ({ visible, onClose }: ContactModalProps) => {
  const { t } = useLanguage();

  const handleEmailPress = async () => {
    try {
      await Linking.openURL('mailto:support@hymatch.jp');
    } catch (error) {
      Alert.alert(t('error.emailOpen.title'), t('error.emailOpen.message'));
    }
  };

  const handlePhonePress = async () => {
    try {
      await Linking.openURL('tel:+81-3-1234-5678');
    } catch (error) {
      Alert.alert(t('error.phoneCall.title'), t('error.phoneCall.message'));
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdropContainer}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('contact.title')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TouchableOpacity style={styles.row} onPress={handleEmailPress}>
              <View style={styles.iconContainer}>
                <Mail size={24} color="#D4A574" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>{t('contact.email')}</Text>
                <Text style={styles.value}>{t('contact.emailAddress')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={handlePhonePress}>
              <View style={styles.iconContainer}>
                <Phone size={24} color="#D4A574" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>{t('contact.phone')}</Text>
                <Text style={styles.value}>{t('contact.phoneNumber')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backdropContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    maxHeight: height * 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0E0C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
});
