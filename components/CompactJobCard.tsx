import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

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
    highlights: string[];
  };
}

export default function CompactJobCard({ job }: CompactJobCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
     // Android shadow
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`w-full max-w-md rounded-2xl mb-4 p-5 shadow-lg border border-gray-100 transform transition-transform duration-200 ${
        isPressed ? "scale-950" : "scale-100"
      }`}
      style={{
        backgroundColor: "#fff",
        elevation: 5, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        padding: 18,
      }}
    >
      <LinearGradient
        colors={["#f8fafc", "#ffffff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-4"
      >
        {/* Job Title */}
        <Text className="text-xl font-bold text-gray-900 mb-3">
          {job.title}
        </Text>

        {/* Location and Commute */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Entypo name="location-pin" size={18} color="#3B82F6" />
            <Text className="text-sm text-gray-700 font-medium ml-2">
              {job.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesome name="subway" size={16} color="#3B82F6" />
            <Text className="text-sm text-gray-700 font-medium ml-2">
              {job.commuteTime}
            </Text>
          </View>
        </View>

        {/* Salary & Japanese Level */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <MaterialIcons name="attach-money" size={18} color="#22C55E" />
            <Text className="text-sm text-green-600 font-semibold ml-2">
              {job.salary}
            </Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesome name="language" size={16} color="#6366F1" />
            <Text className="text-sm text-indigo-600 font-semibold ml-2">
              JLPT {job.japaneseLevel}
            </Text>
          </View>
        </View>

        {/* Work Days */}
        <View className="flex-row flex-wrap gap-2">
          {job.workDays.map((day, index) => (
            <View
              key={index}
              className="bg-indigo-50 px-3 py-1.5 rounded-full"
            >
              <Text className="text-xs text-indigo-700 font-semibold">
                {day}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}