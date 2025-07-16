import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { animated, useSpring } from "@react-spring/native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CompactJobCardProps {
  job: {
    id: string;
    title: string;
    type: string;
    salary: string;
    japaneseLevel: string;
    commuteTime: string;
    location: string;
    workDays: string[];
    highlights?: string[];
  };
  mode?: "chosen" | "refused";
  onDelete?: () => void;
  onRefuse?: () => void;
  onChoose?: () => void;
}

const AnimatedView = animated(View);

export default function CompactJobCard({
  job,
  mode,
  onDelete,
  onRefuse,
  onChoose,
}: CompactJobCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const springProps = useSpring({
    to: { scale: isPressed ? 0.98 : 1 },
    config: { tension: 300, friction: 20 },
  });

  return (
    <AnimatedView
      style={[
        {
          transform: [{ scale: springProps.scale }],
        },
        styles.cardContainer,
      ]}
    >
      <TouchableOpacity
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={1}
        disabled={!(onChoose || onRefuse || onDelete)}
      >
        <LinearGradient
          colors={["#f0f9ff", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBox}
        >
          {/* Title */}
          <Text style={styles.title}>{job.title}</Text>

          {/* Location & Commute */}
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Entypo name="location-pin" size={20} color="#3B82F6" />
              <Text style={styles.subText}>{job.location}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="subway" size={18} color="#3B82F6" />
              <Text style={styles.subText}>{job.commuteTime}</Text>
            </View>
          </View>

          {/* Salary & JLPT */}
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <MaterialIcons name="attach-money" size={20} color="#22C55E" />
              <Text style={styles.salaryText}>{job.salary}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="language" size={18} color="#6366F1" />
              <Text style={styles.jlptText}>JLPT {job.japaneseLevel}</Text>
            </View>
          </View>

          {/* Work Days */}
          <View style={styles.daysWrapper}>
            {job.workDays.map((day, index) => (
              <View key={index} style={styles.dayBadge}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionWrapper}>
            {mode === "chosen" && onRefuse && (
              <TouchableOpacity onPress={onRefuse} style={styles.refuseBtn}>
                <FontAwesome name="times-circle" size={20} color="#dc2626" />
                <Text style={styles.refuseText}>Refuse</Text>
              </TouchableOpacity>
            )}
            {mode === "refused" && onChoose && (
              <TouchableOpacity onPress={onChoose} style={styles.chooseBtn}>
                <FontAwesome name="check-circle" size={20} color="#16a34a" />
                <Text style={styles.chooseText}>Choose</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
                <MaterialIcons name="delete" size={20} color="#6b7280" />
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  } as ViewStyle,

  gradientBox: {
    padding: 16,
    borderRadius: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  } as TextStyle,

  row: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  } as ViewStyle,

  subText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  } as TextStyle,

  salaryText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#22C55E",
    fontWeight: "600",
  } as TextStyle,

  jlptText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "600",
  } as TextStyle,

  daysWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
    marginBottom: 12,
  } as ViewStyle,

  dayBadge: {
    backgroundColor: "#E0E7FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 6,
  },

  dayText: {
    fontSize: 12,
    color: "#4F46E5",
    fontWeight: "600",
  } as TextStyle,

  actionWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 8,
  } as ViewStyle,

  refuseBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FECACA",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  } as ViewStyle,

  refuseText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#B91C1C",
  } as TextStyle,

  chooseBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BBF7D0",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  } as ViewStyle,

  chooseText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#15803D",
  } as TextStyle,

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  } as ViewStyle,

  deleteText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#374151",
  } as TextStyle,
});
