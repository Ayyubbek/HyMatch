import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { JobCard } from './JobCard';
import { SwipeableCard } from './SwipeableCard';
import { useJobs } from '@/contexts/JobContext';
import { Job } from '@/types/Job';

const { width, height } = Dimensions.get('window');

export function SwipeCards() {
  const { addApplication, applications, getFilteredSortedJobs } = useJobs();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out jobs that have already been swiped
  const appliedJobIds = applications.map((app) => app.jobId);
  const filteredSortedJobs = getFilteredSortedJobs();
  const availableJobs = filteredSortedJobs.filter(
    (job) => !appliedJobIds.includes(job.id)
  );

  const handleSwipeRight = () => {
    if (currentIndex < availableJobs.length) {
      const job = availableJobs[currentIndex];
      addApplication(job.id, 'chosen');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < availableJobs.length) {
      const job = availableJobs[currentIndex];
      addApplication(job.id, 'refused');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const visibleJobs = availableJobs.slice(currentIndex);

  if (visibleJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <JobCard
          job={{
            id: 'empty',
            title: 'No more jobs available',
            type: 'office',
            salary: '¥0',
            japaneseLevel: 'N5',
            commuteTimeHome: '0 min',
            commuteTimeSchool: '0 min',
            location: 'Everywhere',
            workDays: [],
            highlights: ['Check back later for new opportunities!'],
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {visibleJobs.map((job, index) => (
        <SwipeableCard
          key={job.id}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          isTop={index === 0}
          zIndex={visibleJobs.length - index}
          style={[
            styles.card,
            {
              transform: [
                { scale: 1 - index * 0.03 },
                { translateY: index * 8 },
              ],
            },
          ]}
        >
          <JobCard job={job} />
        </SwipeableCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  card: {
    position: 'absolute',
    width: width - 40,
    height: 520,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 0,
  },
});
