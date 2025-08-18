import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBuilding,
  faFileContract,
  faCoins,
  faGlobe,
  faClock,
  faTrain,
  faHome,
  faStar,
  faBoxOpen,
  faUtensils,
  faTruck,
  faFileAlt,
  faStore,
  faBroom,
  faHammer,
  faConciergeBell,
  faLaptop,
  faSmile,
  faPeopleGroup,
  faShirt,
  faGift,
  faMedal,
  faShieldHalved,
  faLanguage,
  faBicycle,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Job } from '@/types/Job';
import { InfoButton } from '@/components/InfoButton';
import { InfoModal } from '@/components/InfoModal';
import { IconWithInfo } from '@/components/IconWithInfo';
import { useLanguage } from '@/contexts/LanguageContext';

interface JobCardProps {
  job: Job;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 20;

function getJobIconByType(type: string): IconDefinition {
  switch (type.toLowerCase()) {
    case 'warehouse':
      return faBoxOpen;
    case 'cooking':
      return faUtensils;
    case 'delivery':
      return faTruck;
    case 'office':
      return faFileAlt;
    case 'retail':
      return faStore;
    case 'cleaning':
      return faBroom;
    case 'construction':
      return faHammer;
    case 'restaurant':
      return faConciergeBell;
    default:
      return faFileAlt;
  }
}

function getHighlightIcon(highlight: string): IconDefinition {
  const lower = highlight.toLowerCase();
  if (lower.includes('meal')) return faUtensils;
  if (lower.includes('transportation')) return faTrain;
  if (lower.includes('dormitory') || lower.includes('accommodation'))
    return faHome;
  if (lower.includes('salary') || lower.includes('pay')) return faCoins;
  if (lower.includes('computer')) return faLaptop;
  if (lower.includes('hours') || lower.includes('schedule')) return faClock;
  if (lower.includes('friendly') || lower.includes('staff')) return faSmile;
  if (lower.includes('team')) return faPeopleGroup;
  if (lower.includes('uniform')) return faShirt;
  if (lower.includes('bonus') || lower.includes('tip')) return faGift;
  if (lower.includes('training')) return faMedal;
  if (lower.includes('safety')) return faShieldHalved;
  if (lower.includes('language') || lower.includes('japanese'))
    return faLanguage;
  if (lower.includes('bicycle')) return faBicycle;
  if (lower.includes('quiet')) return faSeedling;
  return faStar;
}

export function JobCard({ job }: JobCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const { t } = useLanguage();

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const salaryParts = job.salary.split(/[–-]/);
  const salaryDisplay =
    salaryParts.length === 2
      ? `¥${parseInt(salaryParts[0], 10).toLocaleString()}–¥${parseInt(
          salaryParts[1],
          10
        ).toLocaleString()}`
      : job.salary;

  const infoTexts = {
    title: `${t('job.position')}: ${t(job.title)}`,
    type: `${t('job.type')}: ${
      t(`jobType.${job.type.toLowerCase()}`) || job.type
    }`,
    salary: `${t('job.salary')}: ${salaryDisplay}`,
    language: `${t('job.languageLevel')}: ${job.japaneseLevel}`,
    commute: `${t('job.commuteTime')}: ${job.commuteTimeHome} ${t('time.min')}`,
    location: `${t('job.location')}: ${t(job.location)}`,
    schedule: t('job.schedule'),
    highlights: t('job.highlights'),
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={[styles.centeredSection, styles.sectionBorder]}>
            <View style={styles.rowCenterFull}>
              <IconWithInfo
                icon={faBuilding}
                size={28}
                color="#1E90FF"
                infoText={infoTexts.title}
                onPress={() => openModal(t('job.position'), infoTexts.title)}
              />
              <Text style={styles.title}>{t(job.title)}</Text>
            </View>
          </View>

          {/* Job Type */}
          <View style={[styles.centeredSection, styles.sectionBorder]}>
            <View style={styles.rowCenterBetween}>
              <View style={styles.rowCenterFull}>
                <IconWithInfo
                  icon={faFileContract}
                  size={26}
                  color="#1E90FF"
                  infoText={infoTexts.type}
                  onPress={() => openModal(t('job.type'), infoTexts.type)}
                />
                <Text style={styles.infoText}>
                  {t(`jobType.${job.type.toLowerCase()}`) || job.type}
                </Text>
              </View>
              <View style={styles.iconCircleLarge}>
                <FontAwesomeIcon
                  icon={getJobIconByType(job.type)}
                  size={26}
                  color="#1E90FF"
                />
              </View>
            </View>
          </View>

          {/* Salary & Language Level */}
          <View style={[styles.rowBetween, styles.sectionBorder]}>
            <View style={styles.rowCenterFull}>
              <IconWithInfo
                icon={faCoins}
                size={26}
                color="#1E90FF"
                infoText={infoTexts.salary}
                onPress={() => openModal(t('job.salary'), infoTexts.salary)}
              />
              <Text style={styles.infoText}>{`¥${parseInt(
                job.salary.split(/[–-]/)[0],
                10
              ).toLocaleString()}–¥${parseInt(
                job.salary.split(/[–-]/)[1],
                10
              ).toLocaleString()}`}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.rowCenterFull}>
              <IconWithInfo
                icon={faGlobe}
                size={26}
                color="#1E90FF"
                infoText={infoTexts.language}
                onPress={() =>
                  openModal(t('job.languageLevel'), infoTexts.language)
                }
              />
              <Text style={styles.infoText}>{job.japaneseLevel}</Text>
            </View>
          </View>

          {/* Commute Time & Station */}
          <View style={[styles.rowBetween, styles.sectionBorder]}>
            <View style={styles.rowCenterFull}>
              <IconWithInfo
                icon={faHome}
                size={26}
                color="#1E90FF"
                infoText={infoTexts.commute}
                onPress={() =>
                  openModal(t('job.commuteTime'), infoTexts.commute)
                }
              />
              <Text style={styles.infoText}>{`${job.commuteTimeHome} ${t(
                'time.min'
              )}`}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.rowCenterFull}>
              <IconWithInfo
                icon={faTrain}
                size={26}
                color="#1E90FF"
                infoText={infoTexts.location}
                onPress={() => openModal(t('job.location'), infoTexts.location)}
              />
              <Text style={styles.infoText}>{t(job.location)}</Text>
            </View>
          </View>

          {/* Work Days & Time */}
          <View style={[styles.scheduleBlock, styles.sectionBorder]}>
            <View style={styles.rowWrap}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                (day, index) => {
                  const isWorkingDay = job.workDays.includes(day);
                  const shortMap: Record<string, string> = {
                    Mon: t('weekday.short.mon'),
                    Tue: t('weekday.short.tue'),
                    Wed: t('weekday.short.wed'),
                    Thu: t('weekday.short.thu'),
                    Fri: t('weekday.short.fri'),
                    Sat: t('weekday.short.sat'),
                    Sun: t('weekday.short.sun'),
                  };
                  const label = shortMap[day] || day;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.dayBadge,
                        isWorkingDay ? styles.dayActive : styles.dayInactive,
                      ]}
                    >
                      <Text
                        style={
                          isWorkingDay
                            ? styles.dayTextActive
                            : styles.dayTextInactive
                        }
                      >
                        {label}
                      </Text>
                    </View>
                  );
                }
              )}
            </View>
            <View style={styles.rowCenterFull}>
              <FontAwesomeIcon icon={faClock} size={22} color="#1E90FF" />
              <Text style={styles.infoText}>{t('job.workingHours')}</Text>
            </View>
          </View>

          {/* Highlights */}
          <View style={[styles.rowStart, styles.sectionBorder]}>
            <IconWithInfo
              icon={faStar}
              size={26}
              color="#1E90FF"
              infoText={infoTexts.highlights}
              onPress={() =>
                openModal(t('job.highlights'), infoTexts.highlights)
              }
            />
            <View style={styles.starFeatures}>
              {job.highlights.map((item, index) => (
                <View key={index} style={styles.starIcon}>
                  <FontAwesomeIcon
                    icon={getHighlightIcon(item)}
                    size={26}
                    color="#fff"
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Modal */}
      <InfoModal
        visible={modalVisible}
        title={modalContent.title}
        content={modalContent.content}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    padding: 8,
    paddingTop: 4,
    borderWidth: 2,
    borderColor: '#c29c70',
    borderRadius: 16,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 36,
    minHeight: 620,
  },
  centeredSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  rowCenterFull: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
    justifyContent: 'center',
  },
  iconCircleLarge: {
    borderWidth: 1,
    borderColor: '#c29c70',
    borderRadius: 50,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dayBadge: {
    borderWidth: 1,
    borderColor: '#c29c70',
    borderRadius: 14,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayActive: {
    backgroundColor: '#c29c70',
  },
  dayInactive: {
    backgroundColor: 'transparent',
  },
  dayTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dayTextInactive: {
    color: '#c29c70',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scheduleBlock: {
    gap: 10,
  },
  starFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    flex: 1,
  },
  starIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#c29c70',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBorder: {
    borderTopWidth: 1,
    borderColor: '#c29c70',
    paddingTop: 12,
    marginTop: -6,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#c29c70',
    marginHorizontal: 10,
  },
});
