import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <TouchableOpacity
        onPress={router.back}
        className="mb-4 w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
      >
        <ArrowLeft size={20} color="#374151" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-gray-800 mb-2">Settings</Text>
    </View>
  );
}
