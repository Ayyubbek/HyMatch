import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { JobListItem } from '@/components/JobListItem';
import { useJobs } from '@/contexts/JobContext';
import { Job } from '@/types/Job';
import { useLanguage } from '@/contexts/LanguageContext';
import { SlidersHorizontal, Heart, Undo2, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ChosenScreen() {
  const { getFilteredSortedChosenJobs, refuseJob, deleteJob } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();
  const chosenJobs = getFilteredSortedChosenJobs();

  const handleRefuseJob = (job: Job) => {
    refuseJob(job.id);
  };

  const handleDeleteJob = (job: Job) => {
    deleteJob(job.id);
  };

  const renderJobItem = ({ item }: { item: Job }) => (
    <View style={styles.jobItemContainer}>
      <View style={styles.innerCard}>
        <JobListItem job={item} variant="flat" compact />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.refuseButton]}
          onPress={() => handleRefuseJob(item)}
        >
          <Undo2 size={14} color="#ffffff" />
          <Text style={styles.buttonText}>{t('common.refuse')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteJob(item)}
        >
          <Trash2 size={14} color="#ffffff" />
          <Text style={styles.buttonText}>{t('common.delete')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerIconButton, { backgroundColor: '#c29c70' }]}
          onPress={() => router.push('/')}
        >
          <Undo2 size={20} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>{t('chosen.title')}</Text>
        </View>
        <TouchableOpacity
          style={[styles.headerIconButton, { backgroundColor: '#c29c70' }]}
          onPress={() => router.push('/filter')}
        >
          <SlidersHorizontal size={20} color={'#ffffff'} />
        </TouchableOpacity>
      </View>

      {chosenJobs.length === 0 ? (
        <View style={styles.emptyState}>
          <Heart size={48} color={'#9ca3af'} />
          <Text style={styles.emptyText}>{t('chosen.empty.title')}</Text>
          <Text style={styles.emptySubtext}>{t('chosen.empty.subtitle')}</Text>
        </View>
      ) : (
        <FlatList
          data={chosenJobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#c29c70',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    padding: 12,
    paddingBottom: 100,
    gap: 12,
  },
  jobItemContainer: {
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#c29c70',
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.6,
    elevation: 5,
  },
  innerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e8d8c6',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#c29c70',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 6,
  },
  refuseButton: {
    backgroundColor: '#f59e0b',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
    textAlign: 'center',
  },
});
