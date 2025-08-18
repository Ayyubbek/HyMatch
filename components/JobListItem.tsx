import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '@/types/Job';
import { JobTypeIcon } from './JobTypeIcon';
import { WorkDayBadge } from './WorkDayBadge';
import { Clock, MapPin, BookOpen } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

interface JobListItemProps {
  job: Job;
  onPress?: () => void;
  variant?: 'card' | 'flat';
  compact?: boolean;
}

export function JobListItem({
  job,
  onPress,
  variant = 'card',
  compact = false,
}: JobListItemProps) {
  const { t } = useLanguage();
  const containerStyle = [
    variant === 'card' ? styles.containerCard : styles.containerFlat,
  ];
  const iconColor = '#6b7280';
  const infoIconSize = compact ? 12 : 14;
  const jobTypeIconSize = compact ? 32 : 40;
  const titleStyle = [styles.title, compact && styles.titleCompact];
  const infoTextStyle = [styles.infoText, compact && styles.infoTextCompact];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.header}>
        <JobTypeIcon type={job.type} size={jobTypeIconSize} />
        <View style={styles.titleContainer}>
          <Text style={titleStyle} numberOfLines={2}>
            {t(job.title)}
          </Text>
          <Text style={styles.salary}>{job.salary}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <BookOpen size={infoIconSize} color={iconColor} />
          <Text style={infoTextStyle}>{job.japaneseLevel}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={infoIconSize} color={iconColor} />
          <Text style={infoTextStyle}>{`${job.commuteTimeHome} ${t(
            'time.min'
          )}`}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={infoIconSize} color={iconColor} />
          <Text style={infoTextStyle} numberOfLines={1}>
            {t(job.location)}
          </Text>
        </View>
      </View>

      <View style={styles.workDaysContainer}>
        {job.workDays.slice(0, 4).map((day, index) => (
          <WorkDayBadge
            key={index}
            day={day}
            size={compact ? 'small' : 'normal'}
          />
        ))}
        {job.workDays.length > 4 && (
          <Text style={infoTextStyle}>+{job.workDays.length - 4}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerFlat: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  titleCompact: {
    fontSize: 15,
    marginBottom: 2,
  },
  salary: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 4,
  },
  infoTextCompact: {
    fontSize: 11,
  },
  workDaysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
