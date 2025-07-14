import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

// Icon va fon ranglari
function getJobIcon(type: string) {
  switch (type) {
    case "warehouse":
      return {
        icon: <FontAwesome5 name="boxes" size={25} color="#7c3aed" />,
        bg: "bg-violet-100",
      };
    case "cooking":
      return {
        icon: <MaterialIcons name="restaurant" size={25} color="#f59e42" />,
        bg: "bg-orange-100",
      };
    case "delivery":
      return {
        icon: <Entypo name="cycle" size={25} color="#38bdf8" />,
        bg: "bg-sky-100",
      };
    case "office":
      return {
        icon: <Ionicons name="document-text" size={25} color="#6366f1" />,
        bg: "bg-indigo-100",
      };
    case "retail":
      return {
        icon: <FontAwesome5 name="store" size={25} color="#22c55e" />,
        bg: "bg-green-100",
      };
    case "cleaning":
      return {
        icon: <FontAwesome5 name="broom" size={25} color="#f472b6" />,
        bg: "bg-pink-100",
      };
    case "construction":
      return {
        icon: <FontAwesome5 name="hard-hat" size={25} color="#fbbf24" />,
        bg: "bg-yellow-100",
      };
    case "restaurant":
      return {
        icon: <MaterialIcons name="local-dining" size={25} color="#ef4444" />,
        bg: "bg-red-100",
      };
    default:
      return {
        icon: <MaterialIcons name="work" size={25} color="#7c3aed" />,
        bg: "bg-violet-100",
      };
  }
}

interface JobCardProps {
  job: any;
  index?: number;
}

export default function JobCard({ job }: JobCardProps) {
  const { icon, bg } = getJobIcon(job.type);

  return (
    <View className="w-full max-w-md bg-white rounded-2xl p-6 mb-8 border border-gray-300 h-[490px]">
      {/* Top Icon */}
      <View className="items-center -mt-12 mb-2">
        <View className={`${bg} rounded-full p-6 border border-white`}>
          {icon}
        </View>
      </View>

      {/* Title */}
      <Text className="text-xl font-bold text-gray-900 text-center mb-1">
        {job.title}
      </Text>

      {/* Star */}
      <View className="flex-row justify-center items-center mb-3">
        <View className="bg-yellow-100 px-2 py-1 rounded-full flex-row items-center">
          <FontAwesome name="star" size={14} color="#fbbf24" />
          <Text className="ml-1 text-yellow-700 font-semibold text-sm">
            4.8
          </Text>
        </View>
      </View>

      {/* Salary */}
      <LinearGradient
        colors={["#6366f1", "#a78bfa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-xl mb-4 shadow-md"
        style={{
          paddingVertical: 18,
          borderRadius: 20,
       
        }}
      >
        <Text className="text-white text-2xl font-bold text-center">
          {job.salary}
        </Text>
        <Text className="text-white text-center text-sm mt-1">per day</Text>
      </LinearGradient>

      {/* Info */}
      <View className="gap-3.5 mb-2">
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-2 mt-4">
          <MaterialIcons name="menu-book" size={20} color="#6366f1" />
          <Text className="ml-2 text-gray-500">Japanese Level:</Text>
          <Text className="ml-auto font-bold text-gray-800">
            {job.japaneseLevel}
          </Text>
        </View>
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-2">
          <MaterialIcons name="access-time" size={20} color="#6366f1" />
          <Text className="ml-2 text-gray-500">Commute:</Text>
          <Text className="ml-auto font-bold text-gray-800">
            {job.commuteTime}
          </Text>
        </View>
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-2">
          <Entypo name="location-pin" size={20} color="#6366f1" />
          <Text className="ml-2 text-gray-500">Location:</Text>
          <Text className="ml-auto font-bold text-gray-800">
            {job.location}
          </Text>
        </View>
      </View>

      {/* Days */}
      <Text className="text-base font-semibold text-gray-800 mt-2">
        Available Days
      </Text>
      <View className="flex-row flex-wrap gap-2 mt-2">
        {job.workDays.map((d: string, i: number) => (
          <Text
            key={i}
            className="bg-violet-100 text-violet-700 rounded px-2 py-1 mr-2 mb-1 font-semibold"
            style={{
              fontSize: 12,
            }}
          >
            {d}
          </Text>
        ))}
      </View>
    </View>
  );
}
