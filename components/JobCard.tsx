import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet } from "react-native";

function getJobIcon(type: string) {
  switch (type) {
    case "warehouse":
      return {
        icon: <FontAwesome5 name="boxes" size={25} color="#7c3aed" />,
        bgStyle: styles.bgViolet,
      };
    case "cooking":
      return {
        icon: <MaterialIcons name="restaurant" size={25} color="#f59e42" />,
        bgStyle: styles.bgOrange,
      };
    case "delivery":
      return {
        icon: <Entypo name="cycle" size={25} color="#38bdf8" />,
        bgStyle: styles.bgSky,
      };
    case "office":
      return {
        icon: <Ionicons name="document-text" size={25} color="#6366f1" />,
        bgStyle: styles.bgIndigo,
      };
    case "retail":
      return {
        icon: <FontAwesome5 name="store" size={25} color="#22c55e" />,
        bgStyle: styles.bgGreen,
      };
    case "cleaning":
      return {
        icon: <FontAwesome5 name="broom" size={25} color="#f472b6" />,
        bgStyle: styles.bgPink,
      };
    case "construction":
      return {
        icon: <FontAwesome5 name="hard-hat" size={25} color="#fbbf24" />,
        bgStyle: styles.bgYellow,
      };
    case "restaurant":
      return {
        icon: <MaterialIcons name="local-dining" size={25} color="#ef4444" />,
        bgStyle: styles.bgRed,
      };
    default:
      return {
        icon: <MaterialIcons name="work" size={25} color="#7c3aed" />,
        bgStyle: styles.bgViolet,
      };
  }
}

interface JobCardProps {
  job: any;
  index?: number;
}

export default function JobCard({ job }: JobCardProps) {
  const { icon, bgStyle } = getJobIcon(job.type);

  return (
    <View style={styles.card}>
      {/* Top Icon */}
      <View style={styles.iconWrapper}>
        <View style={[bgStyle, styles.iconCircle]}>
          {icon}
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{job.title}</Text>

      {/* Star */}
      <View style={styles.starWrapper}>
        <View style={styles.starBox}>
          <FontAwesome name="star" size={14} color="#fbbf24" />
          <Text style={styles.starText}>4.8</Text>
        </View>
      </View>

      {/* Salary */}
      <LinearGradient
        colors={["#6366f1", "#a78bfa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.salaryBox}
      >
        <Text style={styles.salaryText}>{job.salary}</Text>
        <Text style={styles.perDay}>per day</Text>
      </LinearGradient>

      {/* Info */}
      <View style={styles.infoWrapper}>
        <View style={styles.infoItem}>
          <MaterialIcons name="menu-book" size={20} color="#6366f1" />
          <Text style={styles.infoLabel}>Japanese Level:</Text>
          <Text style={styles.infoValue}>{job.japaneseLevel}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="access-time" size={20} color="#6366f1" />
          <Text style={styles.infoLabel}>Commute:</Text>
          <Text style={styles.infoValue}>{job.commuteTime}</Text>
        </View>
        <View style={styles.infoItem}>
          <Entypo name="location-pin" size={20} color="#6366f1" />
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>{job.location}</Text>
        </View>
      </View>

      {/* Days */}
      <Text style={styles.daysLabel}>Available Days</Text>
      <View style={styles.daysWrapper}>
        {job.workDays.map((d: string, i: number) => (
          <Text key={i} style={styles.dayItem}>
            {d}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderColor: "#d1d5db",
    borderWidth: 1,
    height: 500, 
    paddingVertical: 10,
  },
  iconWrapper: {
    alignItems: "center",
    marginTop: -48,
    marginBottom: 8,
  },
  iconCircle: {
    padding: 24,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#fff",
  },
  bgViolet: { backgroundColor: "#ede9fe" },
  bgOrange: { backgroundColor: "#ffedd5" },
  bgSky: { backgroundColor: "#e0f2fe" },
  bgIndigo: { backgroundColor: "#e0e7ff" },
  bgGreen: { backgroundColor: "#dcfce7" },
  bgPink: { backgroundColor: "#fce7f3" },
  bgYellow: { backgroundColor: "#fef9c3" },
  bgRed: { backgroundColor: "#fee2e2" },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  starWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  starBox: {
    backgroundColor: "#fef9c3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
  },
  starText: {
    marginLeft: 4,
    color: "#a16207",
    fontWeight: "600",
    fontSize: 12,
  },
  salaryBox: {
    borderRadius: 20,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  salaryText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  perDay: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
  },
  infoWrapper: {
    gap: 14,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  infoLabel: {
    marginLeft: 8,
    color: "#6b7280",
  },
  infoValue: {
    marginLeft: "auto",
    fontWeight: "bold",
    color: "#1f2937",
  },
  daysLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 8,
  },
  daysWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  dayItem: {
    backgroundColor: "#ede9fe",
    color: "#7c3aed",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
    fontWeight: "600",
    fontSize: 12,
  },
});
