import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Job } from '@/types/Job';
import { Building2, Coins, Clock, MapPin, Star, Calendar, Globe, Brain as Train, Chrome as Home } from 'lucide-react-native';

interface JobCardProps {
  job: Job;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export function JobCard({ job }: JobCardProps) {
  const workDaysJapanese = {
    'Mon': 'MON',
    'Tue': 'TUE', 
    'Wed': 'WED',
    'Thu': 'THU',
    'Fri': 'FRI',
    'Sat': 'SAT',
    'Sun': 'SUN'
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header with building icon and title */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <View style={styles.buildingIcon}>
              <View style={styles.buildingBar1} />
              <View style={styles.buildingBar2} />
              <View style={styles.buildingBar3} />
              <View style={styles.buildingBar4} />
            </View>
            <View style={styles.redDot} />
          </View>
          <Text style={styles.title} numberOfLines={2}>
            軽作業【戸田コールドセンタ...
          </Text>
        </View>

        {/* Job category with icon */}
        <View style={styles.categoryRow}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryIconContainer}>
              <View style={styles.categoryIcon}>
                <View style={styles.checklistLine1} />
                <View style={styles.checklistLine2} />
                <View style={styles.checklistLine3} />
                <View style={styles.checkMark} />
              </View>
              <View style={styles.redDot} />
            </View>
            <Text style={styles.categoryText}>仕分け</Text>
          </View>
          <View style={styles.categoryBadgeContainer}>
            <View style={styles.categoryBadge}>
              <View style={styles.stackIcon}>
                <View style={styles.stackLayer1} />
                <View style={styles.stackLayer2} />
                <View style={styles.stackLayer3} />
              </View>
            </View>
            <View style={styles.redDot} />
          </View>
        </View>

        {/* Salary and Japanese Level */}
        <View style={styles.salaryRow}>
          <View style={styles.salaryContainer}>
            <View style={styles.salaryIconContainer}>
              <View style={styles.coinIcon}>
                <Text style={styles.yenSymbol}>¥</Text>
              </View>
              <View style={styles.redDot} />
            </View>
            <Text style={styles.salaryText}>¥1,030～¥1,130</Text>
          </View>
          <View style={styles.japaneseLevel}>
            <View style={styles.japaneseLevelContainer}>
              <View style={styles.globeIcon}>
                <View style={styles.globeCircle} />
                <View style={styles.globeLine1} />
                <View style={styles.globeLine2} />
              </View>
              <View style={styles.redDot} />
            </View>
            <View style={styles.japaneseLevelDots}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, styles.inactiveDot]} />
              <View style={[styles.dot, styles.inactiveDot]} />
            </View>
            <Text style={styles.japaneseLevelText}>N3</Text>
          </View>
        </View>

        {/* Commute time and station */}
        <View style={styles.commuteRow}>
          <View style={styles.commuteContainer}>
            <View style={styles.commuteIconContainer}>
              <View style={styles.clockIcon}>
                <View style={styles.clockFace} />
                <View style={styles.clockHand1} />
                <View style={styles.clockHand2} />
              </View>
              <View style={styles.redDot} />
            </View>
            <Text style={styles.commuteText}>? 分</Text>
          </View>
          <View style={styles.stationContainer}>
            <View style={styles.stationIconContainer}>
              <View style={styles.trainIcon}>
                <View style={styles.trainBody} />
                <View style={styles.trainWindow1} />
                <View style={styles.trainWindow2} />
              </View>
              <View style={styles.redDot} />
            </View>
            <View style={styles.stationBadge}>
              <Text style={styles.stationText}>戸田公園</Text>
            </View>
          </View>
        </View>

        {/* Work schedule */}
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleIconContainer}>
            <View style={styles.calendarIcon}>
              <View style={styles.calendarTop} />
              <View style={styles.calendarBody} />
              <View style={styles.calendarDate} />
            </View>
            <View style={styles.redDot} />
          </View>
          <View style={styles.workDays}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => {
              const isActive = ['MON', 'TUE', 'WED', 'THU', 'FRI'].includes(day);
              return (
                <View 
                  key={index} 
                  style={[
                    styles.dayBadge,
                    isActive ? styles.activeDayBadge : styles.inactiveDayBadge
                  ]}
                >
                  <Text style={[
                    styles.dayText,
                    isActive ? styles.activeDayText : styles.inactiveDayText
                  ]}>
                    {day}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.timeIcon}>
              <View style={styles.timeClockFace} />
              <View style={styles.timeClockHand} />
            </View>
            <Text style={styles.timeText}>09:00 ～ 18:00</Text>
          </View>
        </View>

        {/* Bottom icons */}
        <View style={styles.bottomIcons}>
          <View style={styles.bottomIconContainer}>
            <View style={styles.starIcon}>
              <View style={styles.starShape} />
            </View>
            <View style={styles.redDot} />
          </View>
          <View style={styles.bottomIconContainer}>
            <View style={styles.clockBottomIcon}>
              <View style={styles.clockBottomFace} />
              <View style={styles.clockBottomHand1} />
              <View style={styles.clockBottomHand2} />
            </View>
            <View style={styles.redDot} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 520,
    padding: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  buildingIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buildingBar1: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: '#FF6B35',
    left: 4,
    top: 8,
  },
  buildingBar2: {
    position: 'absolute',
    width: 2,
    height: 12,
    backgroundColor: '#FF6B35',
    left: 8,
    top: 4,
  },
  buildingBar3: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: '#FF6B35',
    left: 12,
    top: 10,
  },
  buildingBar4: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: '#FF6B35',
    left: 16,
    top: 6,
  },
  redDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#FF4444',
    borderRadius: 4,
    top: -2,
    right: -2,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    lineHeight: 18,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    position: 'relative',
  },
  checklistLine1: {
    position: 'absolute',
    width: 8,
    height: 1,
    backgroundColor: '#666',
    left: 8,
    top: 6,
  },
  checklistLine2: {
    position: 'absolute',
    width: 8,
    height: 1,
    backgroundColor: '#666',
    left: 8,
    top: 10,
  },
  checklistLine3: {
    position: 'absolute',
    width: 8,
    height: 1,
    backgroundColor: '#666',
    left: 8,
    top: 14,
  },
  checkMark: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: '#4CAF50',
    left: 4,
    top: 8,
    transform: [{ rotate: '45deg' }],
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  categoryBadgeContainer: {
    position: 'relative',
  },
  categoryBadge: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackIcon: {
    position: 'relative',
  },
  stackLayer1: {
    width: 12,
    height: 2,
    backgroundColor: '#FFB800',
    marginBottom: 1,
  },
  stackLayer2: {
    width: 12,
    height: 2,
    backgroundColor: '#FFB800',
    marginBottom: 1,
  },
  stackLayer3: {
    width: 12,
    height: 2,
    backgroundColor: '#FFB800',
  },
  salaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryIconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  coinIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFB800',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yenSymbol: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFF',
  },
  salaryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  japaneseLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  japaneseLevelContainer: {
    position: 'relative',
    marginRight: 8,
  },
  globeIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  globeCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  globeLine1: {
    position: 'absolute',
    width: 12,
    height: 1,
    backgroundColor: '#4CAF50',
    top: 8,
  },
  globeLine2: {
    position: 'absolute',
    width: 1,
    height: 12,
    backgroundColor: '#4CAF50',
    left: 11.5,
    top: 6,
  },
  japaneseLevelDots: {
    flexDirection: 'row',
    marginRight: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  inactiveDot: {
    backgroundColor: '#DDD',
  },
  japaneseLevelText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
  },
  commuteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  commuteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commuteIconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  clockIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  clockFace: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  clockHand1: {
    position: 'absolute',
    width: 1,
    height: 4,
    backgroundColor: '#FF6B35',
    top: 8,
    left: 11.5,
  },
  clockHand2: {
    position: 'absolute',
    width: 3,
    height: 1,
    backgroundColor: '#FF6B35',
    top: 11.5,
    left: 10.5,
  },
  commuteText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationIconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  trainIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  trainBody: {
    width: 14,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  trainWindow1: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: '#FFF',
    left: 7,
    top: 8,
  },
  trainWindow2: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: '#FFF',
    left: 12,
    top: 8,
  },
  stationBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  scheduleContainer: {
    marginBottom: 20,
  },
  scheduleIconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    position: 'relative',
  },
  calendarTop: {
    width: 24,
    height: 6,
    backgroundColor: '#FF6B35',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  calendarBody: {
    width: 24,
    height: 18,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  calendarDate: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#FF6B35',
    borderRadius: 4,
    top: 10,
    left: 8,
  },
  workDays: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 4,
  },
  dayBadge: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  activeDayBadge: {
    backgroundColor: '#FFB800',
  },
  inactiveDayBadge: {
    backgroundColor: '#CCC',
  },
  dayText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  activeDayText: {
    color: '#FFF',
  },
  inactiveDayText: {
    color: '#FFF',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    position: 'relative',
  },
  timeClockFace: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#666',
  },
  timeClockHand: {
    position: 'absolute',
    width: 1,
    height: 4,
    backgroundColor: '#666',
    top: 4,
    left: 7.5,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
    marginTop: 'auto',
  },
  bottomIconContainer: {
    position: 'relative',
  },
  starIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  starShape: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFB800',
    transform: [{ rotate: '35deg' }],
  },
  clockBottomIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  clockBottomFace: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  clockBottomHand1: {
    position: 'absolute',
    width: 1,
    height: 4,
    backgroundColor: '#4CAF50',
    top: 8,
    left: 11.5,
  },
  clockBottomHand2: {
    position: 'absolute',
    width: 3,
    height: 1,
    backgroundColor: '#4CAF50',
    top: 11.5,
    left: 10.5,
  },
});