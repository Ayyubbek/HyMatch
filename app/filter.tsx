import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useJobs, JobFilters, SortOption } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  X,
  Menu,
  ArrowUpDown,
  Clock,
  Coins,
  GraduationCap,
  Star,
  Globe,
  Check,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const PANEL_WIDTH = Math.min(width * 0.77, 360);

type SortCategory = 'wage' | 'commuteHome' | 'commuteSchool';
type FilterCategory = 'jobType' | 'japanese' | 'wage' | 'commute' | 'important';

export default function FilterModalRight() {
  const router = useRouter();
  const { filters, setFilters, sortBy, setSortBy } = useJobs();
  const { t } = useLanguage();
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);
  const [localSortBy, setLocalSortBy] = useState<SortOption>(sortBy);
  const [sortModal, setSortModal] = useState<{
    visible: boolean;
    title: string;
    key: SortCategory;
  }>({ visible: false, title: '', key: 'wage' });
  const [filterModal, setFilterModal] = useState<{
    visible: boolean;
    title: string;
    key: FilterCategory;
  }>({ visible: false, title: '', key: 'jobType' });

  // Animation
  const slideAnim = useRef(new Animated.Value(PANEL_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: PANEL_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => router.back());
  };

  const handleApply = () => {
    setFilters(localFilters);
    setSortBy(localSortBy);
    handleClose();
  };

  const handleReset = () => {
    const resetFilters: JobFilters = {
      jobTypes: [],
      wageRange: [0, 5000],
      japaneseLevels: [],
      workDays: [],
      important: [],
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    setLocalSortBy('date');
    setSortBy('date');
  };

  // Mock option lists per category
  const WAGE_OPTIONS: { label: string; value: SortOption }[] = [
    { label: 'High salary', value: 'wageHigh' },
    { label: 'Average salary', value: 'wageAverage' },
    { label: 'Low salary', value: 'wageLow' },
    { label: 'Not sorting', value: 'date' },
  ];
  const COMMUTE_HOME_OPTIONS: { label: string; value: SortOption }[] = [
    { label: 'Shortest time', value: 'commuteHomeShort' },
    { label: 'Average time', value: 'commuteHomeAverage' },
    { label: 'Longest time', value: 'commuteHomeLong' },
    { label: 'Not sorting', value: 'date' },
  ];
  const COMMUTE_SCHOOL_OPTIONS: { label: string; value: SortOption }[] = [
    { label: 'Shortest time', value: 'commuteSchoolShort' },
    { label: 'Average time', value: 'commuteSchoolAverage' },
    { label: 'Longest time', value: 'commuteSchoolLong' },
    { label: 'Not sorting', value: 'date' },
  ];

  // Mock filter option lists per category
  const JOB_TYPE_OPTIONS: { label: string; value: string }[] = [
    { label: 'Warehouse', value: 'Warehouse' },
    { label: 'Cooking', value: 'Cooking' },
    { label: 'Delivery', value: 'Delivery' },
    { label: 'Office', value: 'Office' },
    { label: 'Retail', value: 'Retail' },
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Construction', value: 'Construction' },
    { label: 'Restaurant', value: 'Restaurant' },
  ];
  const JAPANESE_LEVEL_OPTIONS: { label: string; value: string }[] = [
    { label: 'N5', value: 'N5' },
    { label: 'N4', value: 'N4' },
    { label: 'N3', value: 'N3' },
    { label: 'N2', value: 'N2' },
    { label: 'N1', value: 'N1' },
  ];
  const WAGE_RANGE_OPTIONS: { label: string; value: [number, number] }[] = [
    { label: '¥1,000 - ¥1,500', value: [1000, 1500] },
    { label: '¥1,500 - ¥2,000', value: [1500, 2000] },
    { label: '¥2,000 - ¥2,500', value: [2000, 2500] },
    { label: '¥2,500 - ¥3,000', value: [2500, 3000] },
  ];
  const WORK_DAYS_OPTIONS: { label: string; value: string }[] = [
    { label: 'Monday', value: 'Mon' },
    { label: 'Tuesday', value: 'Tue' },
    { label: 'Wednesday', value: 'Wed' },
    { label: 'Thursday', value: 'Thu' },
    { label: 'Friday', value: 'Fri' },
    { label: 'Saturday', value: 'Sat' },
    { label: 'Sunday', value: 'Sun' },
  ];
  const IMPORTANT_OPTIONS: { label: string; value: string }[] = [
    { label: 'Meals included', value: 'Meals included' },
    { label: 'Transportation provided', value: 'Transportation provided' },
    { label: 'Flexible hours', value: 'Flexible hours' },
    { label: 'Free meals', value: 'Free meals' },
    { label: 'Learn Japanese cooking', value: 'Learn Japanese cooking' },
    { label: 'Friendly staff', value: 'Friendly staff' },
    { label: 'Bicycle provided', value: 'Bicycle provided' },
    { label: 'Tips included', value: 'Tips included' },
    { label: 'Flexible schedule', value: 'Flexible schedule' },
    { label: 'Air conditioned', value: 'Air conditioned' },
    { label: 'Computer skills training', value: 'Computer skills training' },
    { label: 'Career growth', value: 'Career growth' },
    { label: 'Employee discount', value: 'Employee discount' },
    { label: 'Customer service training', value: 'Customer service training' },
    { label: 'Team events', value: 'Team events' },
    { label: 'Uniform provided', value: 'Uniform provided' },
    { label: 'Quiet environment', value: 'Quiet environment' },
    { label: 'Bonus pay', value: 'Bonus pay' },
    { label: 'Safety training provided', value: 'Safety training provided' },
    { label: 'High pay', value: 'High pay' },
    { label: 'Skill development', value: 'Skill development' },
    { label: 'Language practice', value: 'Language practice' },
  ];

  // Helpers for active state of circles
  const isDefaultWageRange = (range: [number, number]) =>
    range[0] === 0 && range[1] === 5000;

  const isSortCategoryActive = (key: SortCategory) => {
    if (localSortBy === 'date') return false;
    if (key === 'wage') return localSortBy.startsWith('wage');
    if (key === 'commuteHome') return localSortBy.startsWith('commuteHome');
    if (key === 'commuteSchool') return localSortBy.startsWith('commuteSchool');
    return false;
  };

  const isFilterCategoryActive = (key: FilterCategory) => {
    if (key === 'jobType') return (localFilters.jobTypes?.length || 0) > 0;
    if (key === 'japanese')
      return (localFilters.japaneseLevels?.length || 0) > 0;
    if (key === 'wage') return !isDefaultWageRange(localFilters.wageRange);
    if (key === 'commute') return (localFilters.workDays?.length || 0) > 0;
    if (key === 'important') return (localFilters.important?.length || 0) > 0;
    return false;
  };

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={{ flex: 1, backgroundColor: 'transparent' }} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: slideAnim }], width: PANEL_WIDTH },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Menu size={20} color="#333" />
              <Text style={styles.headerTitle}>{t('filter.sheet.title')}</Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Sort Section */}
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setSortModal({
                    visible: true,
                    title: t('filter.sort.wage'),
                    key: 'wage',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isSortCategoryActive('wage') && styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isSortCategoryActive('wage') && styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Coins size={16} color="#FFB800" />
                </View>
                <Text style={styles.filterText}>{t('filter.sort.wage')}</Text>
                <View style={styles.sortIcon}>
                  <ArrowUpDown size={16} color="#999" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setSortModal({
                    visible: true,
                    title: t('filter.sort.commute.home'),
                    key: 'commuteHome',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isSortCategoryActive('commuteHome') &&
                      styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isSortCategoryActive('commuteHome') &&
                        styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Clock size={16} color="#FF6B35" />
                </View>
                <Text style={styles.filterText}>
                  {t('filter.sort.commute.home')}
                </Text>
                <View style={styles.sortIcon}>
                  <ArrowUpDown size={16} color="#999" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setSortModal({
                    visible: true,
                    title: t('filter.sort.commute.school'),
                    key: 'commuteSchool',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isSortCategoryActive('commuteSchool') &&
                      styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isSortCategoryActive('commuteSchool') &&
                        styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <GraduationCap size={16} color="#4CAF50" />
                </View>
                <Text style={styles.filterText}>
                  {t('filter.sort.commute.school')}
                </Text>
                <View style={styles.sortIcon}>
                  <ArrowUpDown size={16} color="#999" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Filter Section */}
            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Menu size={16} color="#333" />
                <Text style={styles.filterHeaderText}>
                  {t('filter.sheet.header')}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setFilterModal({
                    visible: true,
                    title: t('filter.section.jobType'),
                    key: 'jobType',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isFilterCategoryActive('jobType') &&
                      styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isFilterCategoryActive('jobType') &&
                        styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Star size={16} color="#4CAF50" />
                </View>
                <Text style={styles.filterText}>
                  {t('filter.section.jobType')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setFilterModal({
                    visible: true,
                    title: t('filter.section.japanese'),
                    key: 'japanese',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isFilterCategoryActive('japanese') &&
                      styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isFilterCategoryActive('japanese') &&
                        styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Globe size={16} color="#2196F3" />
                </View>
                <Text style={styles.filterText}>
                  {t('filter.section.japanese')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setFilterModal({
                    visible: true,
                    title: t('filter.section.wage'),
                    key: 'wage',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isFilterCategoryActive('wage') && styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isFilterCategoryActive('wage') && styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Coins size={16} color="#FFB800" />
                </View>
                <Text style={styles.filterText}>
                  {t('filter.section.wage')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setFilterModal({
                    visible: true,
                    title: t('filter.section.commute'),
                    key: 'commute',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isFilterCategoryActive('commute') &&
                      styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isFilterCategoryActive('commute') &&
                        styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Clock size={16} color="#FF6B35" />
                </View>
                <Text style={styles.filterText}>
                  {t('filter.section.commute')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterItem}
                onPress={() =>
                  setFilterModal({
                    visible: true,
                    title: t('filter.section.important'),
                    key: 'important',
                  })
                }
              >
                <View
                  style={[
                    styles.radioButton,
                    isFilterCategoryActive('important') &&
                      styles.radioButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.radioInner,
                      isFilterCategoryActive('important') &&
                        styles.radioInnerActive,
                    ]}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Star size={16} color="#FFB800" />
                </View>
                <Text style={styles.filterText}>
                  {t('filter.section.important')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
      {/* Center Modal for Sort Confirmation */}
      {sortModal.visible && (
        <View style={styles.centerModalOverlay}>
          <TouchableWithoutFeedback
            onPress={() => setSortModal({ ...sortModal, visible: false })}
          >
            <View style={styles.centerBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.centerModal}>
            {/* Close button top-right */}
            <TouchableOpacity
              onPress={() => setSortModal({ ...sortModal, visible: false })}
              style={styles.modalCloseButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>

            <Text style={styles.centerTitle}>{sortModal.title}</Text>
            <Text style={styles.centerDesc}>Choose an option</Text>
            <View style={styles.optionList}>
              {(sortModal.key === 'wage'
                ? WAGE_OPTIONS
                : sortModal.key === 'commuteHome'
                ? COMMUTE_HOME_OPTIONS
                : COMMUTE_SCHOOL_OPTIONS
              ).map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={styles.optionItem}
                  onPress={() => {
                    setLocalSortBy(opt.value);
                    setSortBy(opt.value);
                    setSortModal({ ...sortModal, visible: false });
                  }}
                >
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
      {/* Center Modal for Filter Options */}
      {filterModal.visible && (
        <View style={styles.centerModalOverlay}>
          <TouchableWithoutFeedback
            onPress={() => setFilterModal({ ...filterModal, visible: false })}
          >
            <View style={styles.centerBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.centerModal}>
            {/* Close button top-right */}
            <TouchableOpacity
              onPress={() => setFilterModal({ ...filterModal, visible: false })}
              style={styles.modalCloseButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>

            <Text style={styles.centerTitle}>{filterModal.title}</Text>
            <Text style={styles.centerDesc}>
              {['important', 'commute'].includes(filterModal.key)
                ? 'Choose multiple options'
                : 'Choose an option'}
            </Text>
            {['important', 'japanese', 'commute'].includes(filterModal.key) ? (
              <ScrollView
                style={styles.optionListScroll}
                contentContainerStyle={styles.optionList}
              >
                {(() => {
                  if (filterModal.key === 'japanese') {
                    return JAPANESE_LEVEL_OPTIONS.map((opt) => (
                      <TouchableOpacity
                        key={opt.label}
                        style={styles.optionItem}
                        onPress={() => {
                          const current = new Set(localFilters.japaneseLevels);
                          if (current.has(opt.value)) current.delete(opt.value);
                          else current.add(opt.value);
                          const updated = {
                            ...localFilters,
                            japaneseLevels: Array.from(current),
                          } as JobFilters;
                          setLocalFilters(updated);
                          setFilters(updated);
                          setFilterModal({ ...filterModal, visible: false });
                        }}
                      >
                        <Text style={styles.optionLabel}>{opt.label}</Text>
                      </TouchableOpacity>
                    ));
                  } else if (filterModal.key === 'commute') {
                    return WORK_DAYS_OPTIONS.map((opt) => (
                      <TouchableOpacity
                        key={opt.label}
                        style={[
                          styles.optionItem,
                          localFilters.workDays.includes(opt.value) &&
                            styles.optionItemActive,
                        ]}
                        onPress={() => {
                          const current = new Set(localFilters.workDays);
                          if (current.has(opt.value)) current.delete(opt.value);
                          else current.add(opt.value);
                          const updated = {
                            ...localFilters,
                            workDays: Array.from(current),
                          } as JobFilters;
                          setLocalFilters(updated);
                          setFilters(updated);
                        }}
                      >
                        {localFilters.workDays.includes(opt.value) && (
                          <Check
                            size={18}
                            color="#c29c70"
                            style={styles.optionCheck}
                          />
                        )}
                        <Text style={styles.optionLabel}>{opt.label}</Text>
                      </TouchableOpacity>
                    ));
                  }
                  // important
                  return IMPORTANT_OPTIONS.map((opt) => (
                    <TouchableOpacity
                      key={opt.label}
                      style={[
                        styles.optionItem,
                        (localFilters.important || []).includes(opt.value) &&
                          styles.optionItemActive,
                      ]}
                      onPress={() => {
                        const current = new Set(localFilters.important || []);
                        if (current.has(opt.value)) current.delete(opt.value);
                        else current.add(opt.value);
                        const updated = {
                          ...localFilters,
                          important: Array.from(current),
                        } as JobFilters;
                        setLocalFilters(updated);
                        setFilters(updated);
                      }}
                    >
                      {(localFilters.important || []).includes(opt.value) && (
                        <Check
                          size={18}
                          color="#c29c70"
                          style={styles.optionCheck}
                        />
                      )}
                      <Text style={styles.optionLabel}>{opt.label}</Text>
                    </TouchableOpacity>
                  ));
                })()}
              </ScrollView>
            ) : (
              <View style={styles.optionList}>
                {(() => {
                  if (filterModal.key === 'jobType') {
                    return JOB_TYPE_OPTIONS.map((opt) => (
                      <TouchableOpacity
                        key={opt.label}
                        style={styles.optionItem}
                        onPress={() => {
                          const current = new Set(localFilters.jobTypes);
                          if (current.has(opt.value)) current.delete(opt.value);
                          else current.add(opt.value);
                          const updated = {
                            ...localFilters,
                            jobTypes: Array.from(current),
                          } as JobFilters;
                          setLocalFilters(updated);
                          setFilters(updated);
                          setFilterModal({ ...filterModal, visible: false });
                        }}
                      >
                        <Text style={styles.optionLabel}>{opt.label}</Text>
                      </TouchableOpacity>
                    ));
                  } else if (filterModal.key === 'wage') {
                    return WAGE_RANGE_OPTIONS.map((opt) => (
                      <TouchableOpacity
                        key={opt.label}
                        style={styles.optionItem}
                        onPress={() => {
                          const updated = {
                            ...localFilters,
                            wageRange: opt.value,
                          };
                          setLocalFilters(updated);
                          setFilters(updated);
                          setFilterModal({ ...filterModal, visible: false });
                        }}
                      >
                        <Text style={styles.optionLabel}>{opt.label}</Text>
                      </TouchableOpacity>
                    ));
                  }
                })()}
              </View>
            )}
            {['important', 'commute'].includes(filterModal.key) && (
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() =>
                    setFilterModal({ ...filterModal, visible: false })
                  }
                >
                  <Text style={styles.modalActionText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 80, // Leave space for the tab bar
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    zIndex: 1000,
  },
  container: {
    height: '100%',
    backgroundColor: '#F5F5F5',
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 0 : 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  filterSection: {
    marginTop: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterHeaderText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 8,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  radioButtonActive: {
    borderColor: '#2563EB',
  },
  radioInnerActive: {
    backgroundColor: '#2563EB',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  filterText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  sortIcon: {
    marginLeft: 8,
  },
  centerModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  centerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 999,
  },
  centerModal: {
    width: Math.min(width * 0.85, 360),
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    position: 'relative', // needed for absolute close button
    borderWidth: 2,
    borderColor: '#c29c70',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 1001,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 20,
    padding: 4,
  },
  centerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  centerDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  optionList: {
    gap: 8,
    marginTop: 6,
  },
  optionListScroll: {
    marginTop: 6,
    maxHeight: 260,
    width: '100%',
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#c29c70',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  optionItemActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#c29c70',
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  optionCheck: {
    position: 'absolute',
    left: 10,
  },
  modalActions: {
    marginTop: 16,
    alignItems: 'center',
  },
  modalActionButton: {
    backgroundColor: '#c29c70',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 100,
  },
  modalActionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  centerActions: {
    flexDirection: 'row',
    gap: 10,
  },
});
