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
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faCalendarAlt,
  faGlobeAsia,
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

// Mock data for dropdowns
const mockData = {
  ages: Array.from({ length: 83 }, (_, i) => ({
    label: `${i + 18}歳`,
    value: i + 18,
  })),
  countries: [
    { label: 'Japan', value: 'japan' },
    { label: 'USA', value: 'usa' },
    { label: 'Korea', value: 'korea' },
    { label: 'China', value: 'china' },
  ],
  transportation: [
    { label: '電車', value: 'train' },
    { label: 'バス', value: 'bus' },
    { label: '車', value: 'car' },
    { label: '自転車', value: 'bicycle' },
    { label: '徒歩', value: 'walk' },
  ],
  walkingTime: [
    { label: '1-5分', value: '1-5' },
    { label: '6-10分', value: '6-10' },
    { label: '11-15分', value: '11-15' },
    { label: '16-20分', value: '16-20' },
    { label: '21分以上', value: '21+' },
  ],
  prefectures: [
    { label: '東京都', value: 'tokyo' },
    { label: '大阪府', value: 'osaka' },
    { label: '神奈川県', value: 'kanagawa' },
    { label: '愛知県', value: 'aichi' },
  ],
  cities: [
    { label: '新宿区', value: 'shinjuku' },
    { label: '渋谷区', value: 'shibuya' },
    { label: '港区', value: 'minato' },
    { label: '中央区', value: 'chuo' },
  ],
  areas: [
    { label: '1-1-1', value: '1-1-1' },
    { label: '2-3-4', value: '2-3-4' },
    { label: '5-6-7', value: '5-6-7' },
  ],
  timeSlots: [
    { label: '9:00-12:00', value: 'morning' },
    { label: '12:00-17:00', value: 'afternoon' },
    { label: '17:00-21:00', value: 'evening' },
    { label: '21:00-24:00', value: 'night' },
  ],
  ratings: [
    { label: '★☆☆☆☆', value: 1 },
    { label: '★★☆☆☆', value: 2 },
    { label: '★★★☆☆', value: 3 },
    { label: '★★★★☆', value: 4 },
    { label: '★★★★★', value: 5 },
  ],
  remarkTypes: [
    { label: '一般', value: 'general' },
    { label: '重要', value: 'important' },
    { label: '緊急', value: 'urgent' },
  ],
};

// Information texts for each field
const infoTexts = {
  name: '氏名\n登録者の正式な氏名を入力してください。姓名の順番で記入し、漢字・ひらがな・カタカナで記入可能です。',
  age: '年齢\n現在の年齢を選択してください。18歳以上100歳以下の範囲で選択可能です。年齢によって対象となる求人が変わる場合があります。',
  country:
    '国籍\n出身国または現在の国籍を選択してください。ビザの種類や就労可能な業種に影響する重要な情報です。',
  gender:
    '性別\n性別を選択してください。男性、女性、その他から選択可能です。一部の求人では性別による制限がある場合があります。',
  transportation1:
    '交通手段1\n主要な通勤手段を選択してください。電車、バス、車、自転車、徒歩から選択可能です。',
  walkingTime1:
    '徒歩分数1\n最寄り駅や停留所から職場までの徒歩時間を選択してください。通勤時間の計算に使用されます。',
  transportation2:
    '交通手段2\n副次的な通勤手段がある場合に選択してください。複数の通勤ルートがある場合に有効です。',
  walkingTime2:
    '徒歩分数2\n副次的な交通手段を利用した場合の徒歩時間を選択してください。',
  postalCode:
    '郵便番号\n現住所の7桁の郵便番号を入力してください。ハイフンなしで入力してください。住所の自動入力機能が利用できます。',
  prefecture:
    '都道府県\n現住所の都道府県を選択してください。郵便番号から自動入力することも可能です。',
  city: '市区町村\n現住所の市区町村を選択してください。詳細な住所情報の一部として使用されます。',
  area: '町名・番地\n現住所の町名や番地を選択してください。プライバシーに配慮した範囲で入力してください。',
  address:
    '住所\n現住所の詳細を入力してください。通勤圏内の求人検索や緊急時の連絡先として使用されます。',
  phone:
    '電話番号\n連絡可能な電話番号を入力してください。ハイフンなしで10-11桁の番号を入力してください。',
  email:
    'メールアドレス\n連絡用のメールアドレスを入力してください。求人情報の通知や重要な連絡に使用されます。',
  expiration:
    '有効期限\nプロフィール情報の有効期限を設定してください。定期的な更新が推奨されます。',
  qualificationDate:
    '資格取得予定日\n取得予定の資格がある場合、その予定日を選択してください。スキルアップの計画に使用されます。',
  remarkType:
    '備考種別\n備考の重要度を選択してください。一般、重要、緊急から選択可能です。',
  selectedDays:
    '勤務可能曜日\n勤務可能な曜日を選択してください。複数選択可能です。求人とのマッチングに使用されます。',
  timeSlot:
    '勤務可能時間帯\n勤務可能な時間帯を選択してください。ライフスタイルに合わせた求人検索が可能になります。',
  rating:
    '評価・希望レベル\n希望する職場環境や条件のレベルを5段階で評価してください。求人マッチングの精度向上に使用されます。',
  remark1:
    '備考1\n追加の情報や特記事項がある場合に入力してください。自由記述欄です。',
  remark2:
    '備考2\n補足情報や追加の備考がある場合に入力してください。自由記述欄です。',
};

// Helper function to validate form data
const validateFormData = (formData: any) => {
  const errors: any = {};
  if (!formData.name.trim()) errors.name = '名前を入力してください';
  if (!formData.age) errors.age = '年齢を選択してください';
  if (!formData.country) errors.country = '国を選択してください';
  if (!formData.gender) errors.gender = '性別を選択してください';
  if (!formData.transportation1)
    errors.transportation1 = '交通手段1を選択してください';
  if (!formData.walkingTime1)
    errors.walkingTime1 = '徒歩分数1を選択してください';
  if (!formData.postalCode.match(/^\d{7}$/))
    errors.postalCode = '有効な7桁の郵便番号を入力してください';
  if (!formData.prefecture) errors.prefecture = '都道府県を選択してください';
  if (!formData.city) errors.city = '市区町村を選択してください';
  if (!formData.area) errors.area = '町名・番地を選択してください';
  if (!formData.address.trim()) errors.address = '住所を入力してください';
  if (!formData.phone.match(/^\d{10,11}$/))
    errors.phone = '有効な電話番号を入力してください（10-11桁）';
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = '有効なメールアドレスを入力してください';
  if (!formData.expiration) errors.expiration = '有効期限を選択してください';
  if (!formData.qualificationDate)
    errors.qualificationDate = '資格取得予定日を選択してください';
  if (!formData.remarkType) errors.remarkType = '備考種別を選択してください';
  if (formData.selectedDays.length === 0)
    errors.selectedDays = '少なくとも1つの曜日を選択してください';
  if (!formData.timeSlot) errors.timeSlot = '時間帯を選択してください';
  if (!formData.rating) errors.rating = '評価を選択してください';
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
            <Text style={styles.successBtnText}>OK</Text>
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
    gender: 'その他',
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

  const openInfoModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setInfoModalVisible(true);
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleImageDownload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('権限エラー', '写真へのアクセスが許可されていません。', [
        { text: 'OK' },
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
      Alert.alert('保存エラー', 'まず画像を選択してください。', [
        { text: 'OK' },
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
      console.error('保存エラー:', error);
      Alert.alert('保存失敗', '画像の保存に失敗しました。', [{ text: 'OK' }]);
    }
  };

  const handleSave = async () => {
    const validationErrors = validateFormData(formData);
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
    const validationErrors = validateFormData(formData);
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
              )}:</span> ${formData.gender}</div>
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
      console.error('ダウンロードエラー:', error);
    }
  };

  const handleAddressAutoInput = () => {
    if (!formData.postalCode.match(/^\d{7}$/)) {
      setErrors((prev) => ({
        ...prev,
        postalCode: '有効な7桁の郵便番号を入力してください',
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
          onInfoPress={() => openInfoModal('氏名', infoTexts.name)}
        />
        <DropdownInputRow
          icon={faCalendarAlt}
          placeholder={t('profile.age.select')}
          items={mockData.ages}
          value={formData.age}
          onSelect={(value: string) => updateFormData('age', value)}
          error={errors.age}
          infoText={infoTexts.age}
          onInfoPress={() => openInfoModal('年齢', infoTexts.age)}
        />
        <DropdownInputRow
          icon={faGlobeAsia}
          placeholder={t('profile.country.select')}
          items={mockData.countries}
          value={formData.country}
          onSelect={(value: string) => updateFormData('country', value)}
          error={errors.country}
          infoText={infoTexts.country}
          onInfoPress={() => openInfoModal('国籍', infoTexts.country)}
        />
        <GenderSelector
          selected={formData.gender}
          onSelect={(gender: string) => updateFormData('gender', gender)}
          error={errors.gender}
          infoText={infoTexts.gender}
          onInfoPress={() => openInfoModal('性別', infoTexts.gender)}
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.transportation1')}
          items={mockData.transportation}
          value={formData.transportation1}
          onSelect={(value: string) => updateFormData('transportation1', value)}
          error={errors.transportation1}
          infoText={infoTexts.transportation1}
          onInfoPress={() =>
            openInfoModal('交通手段1', infoTexts.transportation1)
          }
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.walkingTime1')}
          items={mockData.walkingTime}
          value={formData.walkingTime1}
          onSelect={(value: string) => updateFormData('walkingTime1', value)}
          error={errors.walkingTime1}
          infoText={infoTexts.walkingTime1}
          onInfoPress={() => openInfoModal('徒歩分数1', infoTexts.walkingTime1)}
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.transportation2')}
          items={mockData.transportation}
          value={formData.transportation2}
          onSelect={(value: string) => updateFormData('transportation2', value)}
          error={errors.transportation2}
          infoText={infoTexts.transportation2}
          onInfoPress={() =>
            openInfoModal('交通手段2', infoTexts.transportation2)
          }
        />
        <DropdownInputRow
          icon={faHome}
          placeholder={t('profile.walkingTime2')}
          items={mockData.walkingTime}
          value={formData.walkingTime2}
          onSelect={(value: string) => updateFormData('walkingTime2', value)}
          error={errors.walkingTime2}
          infoText={infoTexts.walkingTime2}
          onInfoPress={() => openInfoModal('徒歩分数2', infoTexts.walkingTime2)}
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
          onInfoPress={() => openInfoModal('郵便番号', infoTexts.postalCode)}
        />
        <DropdownInputRow
          icon={faFileAlt}
          placeholder={t('profile.prefecture')}
          items={mockData.prefectures}
          value={formData.prefecture}
          onSelect={(value: string) => updateFormData('prefecture', value)}
          error={errors.prefecture}
          infoText={infoTexts.prefecture}
          onInfoPress={() => openInfoModal('都道府県', infoTexts.prefecture)}
        />
        <DropdownInputRow
          icon={faFileAlt}
          placeholder={t('profile.city')}
          items={mockData.cities}
          value={formData.city}
          onSelect={(value: string) => updateFormData('city', value)}
          error={errors.city}
          infoText={infoTexts.city}
          onInfoPress={() => openInfoModal('市区町村', infoTexts.city)}
        />
        <DropdownInputRow
          icon={faFileAlt}
          placeholder={t('profile.area')}
          items={mockData.areas}
          value={formData.area}
          onSelect={(value: string) => updateFormData('area', value)}
          error={errors.area}
          infoText={infoTexts.area}
          onInfoPress={() => openInfoModal('町名・番地', infoTexts.area)}
        />
        <InputRow
          icon={faMapPin}
          placeholder={t('profile.address')}
          value={formData.address}
          onChangeText={(text: string) => updateFormData('address', text)}
          error={errors.address}
          infoText={infoTexts.address}
          onInfoPress={() => openInfoModal('住所', infoTexts.address)}
        />
        <InputRow
          icon={faPhoneAlt}
          placeholder={t('profile.phone')}
          value={formData.phone}
          onChangeText={(text: string) => updateFormData('phone', text)}
          keyboardType="phone-pad"
          error={errors.phone}
          infoText={infoTexts.phone}
          onInfoPress={() => openInfoModal('電話番号', infoTexts.phone)}
        />
        <InputRow
          icon={faEnvelope}
          placeholder={t('profile.email')}
          value={formData.email}
          onChangeText={(text: string) => updateFormData('email', text)}
          keyboardType="email-address"
          error={errors.email}
          infoText={infoTexts.email}
          onInfoPress={() => openInfoModal('メールアドレス', infoTexts.email)}
        />
        <DropdownInputRow
          icon={faCalendarAlt}
          placeholder={t('profile.expiration')}
          items={mockData.ages}
          value={formData.expiration}
          onSelect={(value: string) => updateFormData('expiration', value)}
          error={errors.expiration}
          infoText={infoTexts.expiration}
          onInfoPress={() => openInfoModal('有効期限', infoTexts.expiration)}
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
            openInfoModal('資格取得予定日', infoTexts.qualificationDate)
          }
        />
        <DropdownInputRow
          icon={faCommentDots}
          placeholder={t('profile.remarkType')}
          items={mockData.remarkTypes}
          value={formData.remarkType}
          onSelect={(value: string) => updateFormData('remarkType', value)}
          error={errors.remarkType}
          infoText={infoTexts.remarkType}
          onInfoPress={() => openInfoModal('備考種別', infoTexts.remarkType)}
        />
        <WeekSelector
          selectedDays={formData.selectedDays}
          onSelectDays={(days: string[]) =>
            updateFormData('selectedDays', days)
          }
          error={errors.selectedDays}
          infoText={infoTexts.selectedDays}
          onInfoPress={() =>
            openInfoModal('勤務可能曜日', infoTexts.selectedDays)
          }
        />
        <DropdownInputRow
          icon={faClock}
          placeholder={t('profile.timeSlot')}
          items={mockData.timeSlots}
          value={formData.timeSlot}
          onSelect={(value: string) => updateFormData('timeSlot', value)}
          error={errors.timeSlot}
          infoText={infoTexts.timeSlot}
          onInfoPress={() =>
            openInfoModal('勤務可能時間帯', infoTexts.timeSlot)
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
            openInfoModal('評価・希望レベル', infoTexts.rating)
          }
        />
        <InputRow
          icon={faFileAlt}
          placeholder={t('profile.remark1')}
          value={formData.remark1}
          onChangeText={(text: string) => updateFormData('remark1', text)}
          error={errors.remark1}
          infoText={infoTexts.remark1}
          onInfoPress={() => openInfoModal('備考1', infoTexts.remark1)}
        />
        <InputRow
          icon={faFileAlt}
          placeholder={t('profile.remark2')}
          value={formData.remark2}
          onChangeText={(text: string) => updateFormData('remark2', text)}
          error={errors.remark2}
          infoText={infoTexts.remark2}
          onInfoPress={() => openInfoModal('備考2', infoTexts.remark2)}
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
  selected,
  onSelect,
  error = '',
  infoText = '',
  onInfoPress,
}: any) {
  const icons = [faMars, faVenus, faGenderless];
  const labels = ['男', '女', 'その他'];

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <IconWithInfo
          icon={faGenderless}
          size={16}
          color="#555"
          infoText={infoText}
          onPress={onInfoPress}
        />
        <View style={[styles.genderWrap, error ? styles.inputError : null]}>
          {labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(label)}
              style={[
                styles.genderBox,
                selected === label && styles.genderActive,
              ]}
            >
              <FontAwesomeIcon
                icon={icons[index]}
                size={12}
                color={selected === label ? '#fff' : '#374151'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.genderText,
                  selected === label && { color: '#fff' },
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
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const labels = ['月', '火', '水', '木', '金', '土', '日'];

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
                  {`${day}\n${labels[index]}`}
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
    padding: 12,
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
    fontSize: 9,
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
