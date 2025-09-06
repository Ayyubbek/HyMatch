import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faCalendarAlt,
  faGlobeAsia,
  faVenusMars,
  faMars,
  faVenus,
  faGenderless,
  faHome,
  faMapPin,
  faPhoneAlt,
  faEnvelope,
  faStar,
  faClock,
  faFileAlt,
  faCommentDots,
  faChevronDown,
  faTimes,
  faDownload,
  faSave,
  faCheck,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { printToFileAsync } from 'expo-print';

// Mock data for dropdowns (labels localized at render time)
const mockData = {
  ages: Array.from({ length: 83 }, (_, i) => ({
    label: String(i + 18),
    value: i + 18,
  })),
  countries: [
    { label: 'Japan', value: 'japan' },
    { label: 'USA', value: 'usa' },
    { label: 'Korea', value: 'korea' },
    { label: 'China', value: 'china' },
  ],
  transportation: [
    { label: 'train', value: 'train' },
    { label: 'bus', value: 'bus' },
    { label: 'car', value: 'car' },
    { label: 'bicycle', value: 'bicycle' },
    { label: 'walk', value: 'walk' },
  ],
  walkingTime: [
    { label: '1-5', value: '1-5' },
    { label: '6-10', value: '6-10' },
    { label: '11-15', value: '11-15' },
    { label: '16-20', value: '16-20' },
    { label: '21+', value: '21+' },
  ],
  prefectures: [
    { label: 'tokyo', value: 'tokyo' },
    { label: 'osaka', value: 'osaka' },
    { label: 'kanagawa', value: 'kanagawa' },
    { label: 'aichi', value: 'aichi' },
  ],
  cities: [
    { label: 'shinjuku', value: 'shinjuku' },
    { label: 'shibuya', value: 'shibuya' },
    { label: 'minato', value: 'minato' },
    { label: 'chuo', value: 'chuo' },
  ],
  areas: [
    { label: '1-1-1', value: '1-1-1' },
    { label: '2-3-4', value: '2-3-4' },
    { label: '5-6-7', value: '5-6-7' },
  ],
  timeSlots: [
    { label: 'morning', value: 'morning' },
    { label: 'afternoon', value: 'afternoon' },
    { label: 'evening', value: 'evening' },
    { label: 'night', value: 'night' },
  ],
  ratings: [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ],
  remarkTypes: [
    { label: 'general', value: 'general' },
    { label: 'important', value: 'important' },
    { label: 'urgent', value: 'urgent' },
  ],
};

// Information texts for each field
const infoTexts = {
  name: 'profile.info.name',
  age: 'profile.info.age',
  country: 'profile.info.country',
  gender: 'profile.info.gender',
  transportation1: 'profile.info.transportation1',
  walkingTime1: 'profile.info.walkingTime1',
  transportation2: 'profile.info.transportation2',
  walkingTime2: 'profile.info.walkingTime2',
  postalCode: 'profile.info.postalCode',
  prefecture: 'profile.info.prefecture',
  city: 'profile.info.city',
  area: 'profile.info.area',
  address: 'profile.info.address',
  phone: 'profile.info.phone',
  email: 'profile.info.email',
  expiration: 'profile.info.expiration',
  qualificationDate: 'profile.info.qualificationDate',
  remarkType: 'profile.info.remarkType',
  selectedDays: 'profile.info.selectedDays',
  timeSlot: 'profile.info.timeSlot',
  rating: 'profile.info.rating',
  remark1: 'profile.info.remark1',
  remark2: 'profile.info.remark2',
};

// Helper function to validate form data
const validateFormData = (formData: any, t: (k: string) => string) => {
  const errors: any = {};
  if (!formData.name.trim()) errors.name = t('validation.name');
  if (!formData.age) errors.age = t('validation.age');
  if (!formData.country) errors.country = t('validation.country');
  if (!formData.gender) errors.gender = t('validation.gender');
  if (!formData.transportation1)
    errors.transportation1 = t('validation.transportation1');
  if (!formData.walkingTime1)
    errors.walkingTime1 = t('validation.walkingTime1');
  if (!formData.postalCode.match(/^\d{7}$/))
    errors.postalCode = t('validation.postalCode');
  if (!formData.prefecture) errors.prefecture = t('validation.prefecture');
  if (!formData.city) errors.city = t('validation.city');
  if (!formData.area) errors.area = t('validation.area');
  if (!formData.address.trim()) errors.address = t('validation.address');
  if (!formData.phone.match(/^\d{10,11}$/))
    errors.phone = t('validation.phone');
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = t('validation.email');
  if (!formData.expiration) errors.expiration = t('validation.expiration');
  if (!formData.qualificationDate)
    errors.qualificationDate = t('validation.qualificationDate');
  if (!formData.remarkType) errors.remarkType = t('validation.remarkType');
  if (formData.selectedDays.length === 0)
    errors.selectedDays = t('validation.selectedDays');
  if (!formData.timeSlot) errors.timeSlot = t('validation.timeSlot');
  if (!formData.rating) errors.rating = t('validation.rating');
  return errors;
};

// Styled Success Modal (JobCard-inspired)
function SuccessModal({
  visible,
  message,
  icon,
  onClose,
}: {
  visible: boolean;
  message: string;
  icon: any;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.successOverlay}>
        <View style={styles.successModal}>
          <View style={styles.successIconWrap}>
            <FontAwesomeIcon icon={icon} size={22} color={'#fff'} />
          </View>
          <Text style={styles.successText}>{message}</Text>
          <TouchableOpacity style={styles.successBtn} onPress={onClose}>
            <Text style={styles.successBtnText}>{t('common.ok')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Info Modal Component (restyled)
function InfoModal({ visible, title, content, onClose }: any) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.infoModalOverlay}>
        <View style={styles.infoModalContentCard}>
          <View style={styles.infoModalHeaderCard}>
            <Text style={styles.infoModalTitle}>{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.infoModalCloseBtn}
            >
              <FontAwesomeIcon icon={faTimes} size={20} color="#555" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.infoModalBody}>
            <Text style={styles.infoModalText}>{content}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// IconWithInfo Component
function IconWithInfo({
  icon,
  size = 24,
  color = '#555',
  infoText,
  onPress,
}: any) {
  return (
    <View style={styles.iconWithInfoContainer}>
      <TouchableOpacity
        style={styles.iconWrap}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <FontAwesomeIcon icon={icon} size={size} color={color} />
        <View style={styles.infoIconButton}>
          <FontAwesomeIcon icon={faInfoCircle} size={12} color={color} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function ProfileScreen() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    gender: 'other',
    transportation1: '',
    walkingTime1: '',
    transportation2: '',
    walkingTime2: '',
    postalCode: '',
    prefecture: '',
    city: '',
    area: '',
    address: '',
    phone: '',
    email: '',
    expiration: '',
    qualificationDate: '',
    remarkType: '',
    selectedDays: [],
    timeSlot: '',
    rating: '',
    remark1: '',
    remark2: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [successModal, setSuccessModal] = useState<{
    visible: boolean;
    message: string;
    icon: any;
  }>({ visible: false, message: '', icon: faCheck });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('profile');
        if (saved) setFormData(JSON.parse(saved));
      } catch {}
    })();
  }, []);

  const openInfoModal = (title: string, contentKey: string) => {
    setModalContent({ title, content: t(contentKey) });
    setInfoModalVisible(true);
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleImageDownload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('error.permission.title'), t('error.permission.photos'), [
        { text: t('common.ok') },
      ]);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleImageSave = async () => {
    if (!imageUri) {
      Alert.alert(t('error.save.title'), t('error.save.noImage'), [
        { text: t('common.ok') },
      ]);
      return;
    }
    try {
      const fileUri = FileSystem.documentDirectory + 'saved-image.jpg';
      await FileSystem.copyAsync({ from: imageUri, to: fileUri });
      setSuccessModal({
        visible: true,
        message: t('profile.savedSuccess'),
        icon: faSave,
      });
    } catch (error) {
      console.error('save-error:', error);
      Alert.alert(t('error.save.failedTitle'), t('error.save.failedMessage'), [
        { text: t('common.ok') },
      ]);
    }
  };

  const handleSave = async () => {
    const validationErrors = validateFormData(formData, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(formData));
      setSuccessModal({
        visible: true,
        message: t('profile.savedSuccess'),
        icon: faSave,
      });
    } catch (error) {
      console.error('保存エラー:', error);
    }
  };

  const handleDownloadPdf = async () => {
    const validationErrors = validateFormData(formData, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const html = `
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body { font-family: Helvetica, Arial; padding: 16px; }
              h1 { font-size: 20px; color: #333; }
              .section { margin-bottom: 10px; padding: 10px; border: 1px solid #c29c70; border-radius: 10px; }
              .row { margin: 4px 0; }
              .label { font-weight: bold; color: #3B2F20; }
            </style>
          </head>
          <body>
            <h1>${t('profile.title')}</h1>
            <div class="section">
              <div class="row"><span class="label">${t(
                'profile.name'
              )}:</span> ${formData.name}</div>
              <div class="row"><span class="label">${t(
                'profile.age.select'
              )}:</span> ${formData.age}</div>
              <div class="row"><span class="label">${t(
                'profile.country.select'
              )}:</span> ${formData.country}</div>
              <div class="row"><span class="label">${t(
                'profile.gender'
              )}:</span> ${
        formData.gender === 'male'
          ? t('gender.male')
          : formData.gender === 'female'
          ? t('gender.female')
          : t('gender.other')
      }</div>
              <div class="row"><span class="label">${t(
                'profile.phone'
              )}:</span> ${formData.phone}</div>
              <div class="row"><span class="label">${t(
                'profile.email'
              )}:</span> ${formData.email}</div>
            </div>
            <div class="section">
              <div class="row"><span class="label">${t(
                'profile.postalCode'
              )}:</span> ${formData.postalCode}</div>
              <div class="row"><span class="label">${t(
                'profile.prefecture'
              )}:</span> ${formData.prefecture}</div>
              <div class="row"><span class="label">${t(
                'profile.city'
              )}:</span> ${formData.city}</div>
              <div class="row"><span class="label">${t(
                'profile.area'
              )}:</span> ${formData.area}</div>
              <div class="row"><span class="label">${t(
                'profile.address'
              )}:</span> ${formData.address}</div>
            </div>
            <div class="section">
              <div class="row"><span class="label">${t(
                'profile.transportation1'
              )}:</span> ${formData.transportation1}</div>
              <div class="row"><span class="label">${t(
                'profile.walkingTime1'
              )}:</span> ${formData.walkingTime1}</div>
              <div class="row"><span class="label">${t(
                'profile.transportation2'
              )}:</span> ${formData.transportation2}</div>
              <div class="row"><span class="label">${t(
                'profile.walkingTime2'
              )}:</span> ${formData.walkingTime2}</div>
            </div>
            <div class="section">
              <div class="row"><span class="label">${t(
                'profile.timeSlot'
              )}:</span> ${formData.timeSlot}</div>
              <div class="row"><span class="label">${t(
                'profile.rating'
              )}:</span> ${formData.rating}</div>
              <div class="row"><span class="label">${t(
                'profile.remarkType'
              )}:</span> ${formData.remarkType}</div>
              <div class="row"><span class="label">${t(
                'profile.remark1'
              )}:</span> ${formData.remark1}</div>
              <div class="row"><span class="label">${t(
                'profile.remark2'
              )}:</span> ${formData.remark2}</div>
            </div>
          </body>
        </html>
      `;

      const { uri } = await printToFileAsync({ html });

      if (uri && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(uri);
      }
      setSuccessModal({
        visible: true,
        message: t('profile.downloadedSuccess'),
        icon: faDownload,
      });
    } catch (error) {
      console.error('download-error:', error);
    }
  };

  const handleAddressAutoInput = () => {
    if (!formData.postalCode.match(/^\d{7}$/)) {
      setErrors((prev) => ({
        ...prev,
        postalCode: t('validation.postalCode'),
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, postalCode: '' }));
    updateFormData('prefecture', 'tokyo');
    updateFormData('city', 'shinjuku');
    updateFormData('area', '1-1-1');
    updateFormData('address', '新宿区西新宿1-1-1');
  };

  const onClose = useCallback(() => {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/');
      }
    } catch (e) {
      router.replace('/');
    }
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeftPlaceholder} />
        <View style={styles.headerRightGroup}>
          <Text style={styles.headerTitle}>{t('profile.title')}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesomeIcon icon={faTimes} size={20} color={'#555'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <InputRow
          icon={faUser}
          placeholder={t('profile.name')}
          hasImage
          value={formData.name}
          onChangeText={(text: string) => updateFormData('name', text)}
          error={errors.name}
          imageUri={imageUri}
          onImageDownload={handleImageDownload}
          infoText={infoTexts.name}
          onInfoPress={() => openInfoModal(t('profile.name'), infoTexts.name)}
        />
        <DropdownInputRow
          icon={faCalendarAlt}
          placeholder={t('profile.age.select')}
          items={mockData.ages}
          value={formData.age}
          onSelect={(value: string) => updateFormData('age', value)}
          error={errors.age}
          infoText={infoTexts.age}
          onInfoPress={() =>
            openInfoModal(t('profile.age.select'), infoTexts.age)
          }
        />
        <DropdownInputRow
          icon={faGlobeAsia}
          placeholder={t('profile.country.select')}
          items={mockData.countries.map((i: any) => ({
            ...i,
            label: t(`country.${i.value}`),
          }))}
          value={formData.country}
          onSelect={(value: string) => updateFormData('country', value)}
          error={errors.country}
          infoText={infoTexts.country}
          onInfoPress={() =>
            openInfoModal(t('profile.country.select'), infoTexts.country)
          }
        />
        <GenderSelector
          icon={faVenusMars}
          placeholder={t('profile.gender')}
          selected={formData.gender}
          onSelect={(gender: string) => updateFormData('gender', gender)}
          error={errors.gender}
          infoText={infoTexts.gender}
          onInfoPress={() =>
            openInfoModal(t('profile.gender'), infoTexts.gender)
          }
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.transportation1')}
          items={mockData.transportation.map((i: any) => ({
            ...i,
            label: t(`transport.${i.value}`),
          }))}
          value={formData.transportation1}
          onSelect={(value: string) => updateFormData('transportation1', value)}
          error={errors.transportation1}
          infoText={infoTexts.transportation1}
          onInfoPress={() =>
            openInfoModal(
              t('profile.transportation1'),
              infoTexts.transportation1
            )
          }
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.walkingTime1')}
          items={mockData.walkingTime.map((i: any) => ({
            ...i,
            label: t(`walking.${i.value}`),
          }))}
          value={formData.walkingTime1}
          onSelect={(value: string) => updateFormData('walkingTime1', value)}
          error={errors.walkingTime1}
          infoText={infoTexts.walkingTime1}
          onInfoPress={() =>
            openInfoModal(t('profile.walkingTime1'), infoTexts.walkingTime1)
          }
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.transportation2')}
          items={mockData.transportation.map((i: any) => ({
            ...i,
            label: t(`transport.${i.value}`),
          }))}
          value={formData.transportation2}
          onSelect={(value: string) => updateFormData('transportation2', value)}
          error={errors.transportation2}
          infoText={infoTexts.transportation2}
          onInfoPress={() =>
            openInfoModal(
              t('profile.transportation2'),
              infoTexts.transportation2
            )
          }
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.walkingTime2')}
          items={mockData.walkingTime.map((i: any) => ({
            ...i,
            label: t(`walking.${i.value}`),
          }))}
          value={formData.walkingTime2}
          onSelect={(value: string) => updateFormData('walkingTime2', value)}
          error={errors.walkingTime2}
          infoText={infoTexts.walkingTime2}
          onInfoPress={() =>
            openInfoModal(t('profile.walkingTime2'), infoTexts.walkingTime2)
          }
        />
        <InputRow
          icon={faMapPin}
          placeholder={t('profile.postalCode')}
          hasButton
          buttonText={t('profile.addressAutoFill')}
          onButtonPress={handleAddressAutoInput}
          value={formData.postalCode}
          onChangeText={(text: string) => updateFormData('postalCode', text)}
          keyboardType="numeric"
          error={errors.postalCode}
          infoText={infoTexts.postalCode}
          onInfoPress={() =>
            openInfoModal(t('profile.postalCode'), infoTexts.postalCode)
          }
        />
        <DropdownInputRow
          icon={faFileAlt}
          placeholder={t('profile.prefecture')}
          items={mockData.prefectures.map((i: any) => ({
            ...i,
            label: t(`prefecture.${i.value}`),
          }))}
          value={formData.prefecture}
          onSelect={(value: string) => updateFormData('prefecture', value)}
          error={errors.prefecture}
          infoText={infoTexts.prefecture}
          onInfoPress={() =>
            openInfoModal(t('profile.prefecture'), infoTexts.prefecture)
          }
        />
        <DropdownInputRow
          icon={faFileAlt}
          placeholder={t('profile.city')}
          items={mockData.cities.map((i: any) => ({
            ...i,
            label: t(`city.${i.value}`),
          }))}
          value={formData.city}
          onSelect={(value: string) => updateFormData('city', value)}
          error={errors.city}
          infoText={infoTexts.city}
          onInfoPress={() => openInfoModal(t('profile.city'), infoTexts.city)}
        />
        <DropdownInputRow
          icon={faFileAlt}
          placeholder={t('profile.area')}
          items={mockData.areas}
          value={formData.area}
          onSelect={(value: string) => updateFormData('area', value)}
          error={errors.area}
          infoText={infoTexts.area}
          onInfoPress={() => openInfoModal(t('profile.area'), infoTexts.area)}
        />
        <InputRow
          icon={faMapPin}
          placeholder={t('profile.address')}
          value={formData.address}
          onChangeText={(text: string) => updateFormData('address', text)}
          error={errors.address}
          infoText={infoTexts.address}
          onInfoPress={() =>
            openInfoModal(t('profile.address'), infoTexts.address)
          }
        />
        <InputRow
          icon={faPhoneAlt}
          placeholder={t('profile.phone')}
          value={formData.phone}
          onChangeText={(text: string) => updateFormData('phone', text)}
          keyboardType="phone-pad"
          error={errors.phone}
          infoText={infoTexts.phone}
          onInfoPress={() => openInfoModal(t('profile.phone'), infoTexts.phone)}
        />
        <InputRow
          icon={faEnvelope}
          placeholder={t('profile.email')}
          value={formData.email}
          onChangeText={(text: string) => updateFormData('email', text)}
          keyboardType="email-address"
          error={errors.email}
          infoText={infoTexts.email}
          onInfoPress={() => openInfoModal(t('profile.email'), infoTexts.email)}
        />
        <DropdownInputRow
          icon={faCalendarAlt}
          placeholder={t('profile.expiration')}
          items={mockData.ages}
          value={formData.expiration}
          onSelect={(value: string) => updateFormData('expiration', value)}
          error={errors.expiration}
          infoText={infoTexts.expiration}
          onInfoPress={() =>
            openInfoModal(t('profile.expiration'), infoTexts.expiration)
          }
        />
        <DropdownInputRow
          icon={faCalendarAlt}
          placeholder={t('profile.qualificationDate')}
          items={mockData.ages}
          value={formData.qualificationDate}
          onSelect={(value: string) =>
            updateFormData('qualificationDate', value)
          }
          error={errors.qualificationDate}
          infoText={infoTexts.qualificationDate}
          onInfoPress={() =>
            openInfoModal(
              t('profile.qualificationDate'),
              infoTexts.qualificationDate
            )
          }
        />
        <DropdownInputRow
          icon={faCommentDots}
          placeholder={t('profile.remarkType')}
          items={mockData.remarkTypes.map((i: any) => ({
            ...i,
            label: t(`remarkType.${i.value}`),
          }))}
          value={formData.remarkType}
          onSelect={(value: string) => updateFormData('remarkType', value)}
          error={errors.remarkType}
          infoText={infoTexts.remarkType}
          onInfoPress={() =>
            openInfoModal(t('profile.remarkType'), infoTexts.remarkType)
          }
        />
        <WeekSelector
          selectedDays={formData.selectedDays}
          onSelectDays={(days: string[]) =>
            updateFormData('selectedDays', days)
          }
          error={errors.selectedDays}
          infoText={infoTexts.selectedDays}
          onInfoPress={() =>
            openInfoModal(t('profile.selectedDays'), infoTexts.selectedDays)
          }
        />
        <DropdownInputRow
          icon={faClock}
          placeholder={t('profile.timeSlot')}
          items={mockData.timeSlots.map((i: any) => ({
            ...i,
            label: t(`timeSlotOption.${i.value}`),
          }))}
          value={formData.timeSlot}
          onSelect={(value: string) => updateFormData('timeSlot', value)}
          error={errors.timeSlot}
          infoText={infoTexts.timeSlot}
          onInfoPress={() =>
            openInfoModal(t('profile.timeSlot'), infoTexts.timeSlot)
          }
        />
        <DropdownInputRow
          icon={faStar}
          placeholder={t('profile.rating')}
          items={mockData.ratings}
          value={formData.rating}
          onSelect={(value: string) => updateFormData('rating', value)}
          error={errors.rating}
          infoText={infoTexts.rating}
          onInfoPress={() =>
            openInfoModal(t('profile.rating'), infoTexts.rating)
          }
        />
        <InputRow
          icon={faFileAlt}
          placeholder={t('profile.remark1')}
          value={formData.remark1}
          onChangeText={(text: string) => updateFormData('remark1', text)}
          error={errors.remark1}
          infoText={infoTexts.remark1}
          onInfoPress={() =>
            openInfoModal(t('profile.remark1'), infoTexts.remark1)
          }
        />
        <InputRow
          icon={faFileAlt}
          placeholder={t('profile.remark2')}
          value={formData.remark2}
          onChangeText={(text: string) => updateFormData('remark2', text)}
          error={errors.remark2}
          infoText={infoTexts.remark2}
          onInfoPress={() =>
            openInfoModal(t('profile.remark2'), infoTexts.remark2)
          }
        />
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleDownloadPdf}
          >
            <Text style={styles.confirmText}>{t('profile.download')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>{t('profile.save')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Info Modal */}
      <InfoModal
        visible={infoModalVisible}
        title={modalContent.title}
        content={modalContent.content}
        onClose={() => setInfoModalVisible(false)}
      />

      {/* Success Modal */}
      <SuccessModal
        visible={successModal.visible}
        message={successModal.message}
        icon={successModal.icon}
        onClose={() => setSuccessModal((s) => ({ ...s, visible: false }))}
      />
    </SafeAreaView>
  );
}

function InputRow({
  icon,
  placeholder,
  hasImage = false,
  hasButton = false,
  buttonText = 'ボタン',
  onButtonPress,
  value = '',
  onChangeText,
  keyboardType = 'default',
  error = '',
  imageUri = null,
  onImageDownload,
  infoText = '',
  onInfoPress,
}: any) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <IconWithInfo
          icon={icon}
          size={24}
          color="#555"
          infoText={infoText}
          onPress={onInfoPress}
        />
        <View style={styles.inputWrap}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            style={[styles.input, error ? styles.inputError : null]}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
          />
        </View>

        {hasImage && (
          <View style={styles.imageContainer}>
            {imageUri && (
              <Image
                source={{ uri: imageUri as string }}
                style={styles.imagePlaceholder}
              />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={onImageDownload}
              >
                <FontAwesomeIcon icon={faDownload} size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {hasButton && !hasImage && (
          <TouchableOpacity style={styles.addressBtn} onPress={onButtonPress}>
            <Text style={{ fontSize: 12, color: '#fff' }}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function DropdownInputRow({
  icon,
  placeholder,
  items,
  value,
  onSelect,
  error = '',
  infoText = '',
  onInfoPress,
}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedItem = items.find((item: any) => item.value === value);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <IconWithInfo
          icon={icon}
          size={24}
          color="#555"
          infoText={infoText}
          onPress={onInfoPress}
        />
        <TouchableOpacity
          style={[styles.dropdownButton, error ? styles.inputError : null]}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={[
              styles.dropdownButtonText,
              !selectedItem && styles.placeholderText,
            ]}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
          <FontAwesomeIcon icon={faChevronDown} size={12} color="#9ca3af" />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentCard}>
            <View style={styles.modalHeaderCard}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <FontAwesomeIcon icon={faTimes} size={20} color="#555" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={items}
              keyExtractor={(item: any) => item.value.toString()}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    value === item.value && styles.selectedModalItem,
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      value === item.value && styles.selectedModalItemText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function GenderSelector({
  icon = faVenusMars,
  selected,
  onSelect,
  error = '',
  infoText = '',
  onInfoPress,
}: any) {
  const { t } = useLanguage();
  const icons = [faMars, faVenus, faGenderless];
  const labels = [t('gender.male'), t('gender.female'), t('gender.other')];
  const values = ['male', 'female', 'other'];

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <IconWithInfo
          icon={icon}
          size={24}
          color="#555"
          infoText={infoText}
          onPress={onInfoPress}
        />
        <View style={[styles.genderWrap, error ? styles.inputError : null]}>
          {labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(values[index])}
              style={[
                styles.genderBox,
                selected === values[index] && styles.genderActive,
              ]}
            >
              <FontAwesomeIcon
                icon={icons[index]}
                size={12}
                color={selected === values[index] ? '#fff' : '#374151'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.genderText,
                  selected === values[index] && { color: '#fff' },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function WeekSelector({
  selectedDays,
  onSelectDays,
  error = '',
  infoText = '',
  onInfoPress,
}: any) {
  const { t } = useLanguage();
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const labels = [
    t('weekday.short.mon'),
    t('weekday.short.tue'),
    t('weekday.short.wed'),
    t('weekday.short.thu'),
    t('weekday.short.fri'),
    t('weekday.short.sat'),
    t('weekday.short.sun'),
  ];

  const toggleDay = (day: string) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d: string) => d !== day)
      : [...selectedDays, day];
    onSelectDays(newSelectedDays);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <IconWithInfo
          icon={faCalendarAlt}
          size={24}
          color="#555"
          infoText={infoText}
          onPress={onInfoPress}
        />
        <View style={[styles.weekWrap, error ? styles.inputError : null]}>
          {days.map((day, index) => {
            const isSelected = selectedDays.includes(day);
            return (
              <TouchableOpacity
                key={day}
                onPress={() => toggleDay(day)}
                style={[
                  styles.dayBox,
                  isSelected && { backgroundColor: '#2563eb' },
                ]}
              >
                <Text style={[styles.dayText, isSelected && { color: '#fff' }]}>
                  {labels[index]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Platform.OS === 'android' ? 32 : 12,
    justifyContent: 'space-between',
  },
  headerLeftPlaceholder: {
    width: 40,
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    marginRight: 120,
    color: '#111',
    fontWeight: '800',
  },
  closeButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 80,
  },
  inputContainer: {
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWithInfoContainer: {
    position: 'relative',
  },
  iconWrap: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#fdf5e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  infoIconButton: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  inputWrap: {
    flex: 1,
    position: 'relative',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff4d4f',
  },
  dropdownButton: {
    height: 44,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#9ca3af',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  imagePlaceholder: {
    width: 46,
    height: 46,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 0,
  },
  imageButton: {
    width: 40,
    height: 40,
    backgroundColor: '#e5a663',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  addressBtn: {
    backgroundColor: '#e5a663',
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#9ca3af',
    paddingVertical: 16,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#f59e0b',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 48,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentCard: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#c29c70',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  modalHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  modalCloseBtn: {
    padding: 6,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedModalItem: {
    backgroundColor: '#f8f1e9',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedModalItemText: {
    color: '#c29c70',
    fontWeight: 'bold',
  },
  // Restyled Info modal
  infoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoModalContentCard: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#c29c70',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  infoModalHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  infoModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  infoModalCloseBtn: {
    padding: 8,
  },
  infoModalBody: {
    maxHeight: 400,
  },
  infoModalText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
    padding: 16,
  },
  // Gender & Week styles
  genderWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 6,
  },
  genderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    marginRight: 6,
  },
  genderActive: {
    backgroundColor: '#2563eb',
  },
  genderText: {
    fontSize: 12,
    color: '#374151',
  },
  weekWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 6,
  },
  dayBox: {
    width: 35,
    height: 36,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    marginRight: 3,
  },
  dayText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 12,
  },
  // Success modal
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#c29c70',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  successIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c29c70',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  successBtn: {
    backgroundColor: '#c29c70',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  successBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
