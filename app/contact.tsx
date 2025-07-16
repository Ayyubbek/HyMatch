import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, Text, Linking } from "react-native";

export default function ContactScreen() {
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL("mailto:support@hymatch.com");
  };

  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <TouchableOpacity
        onPress={router.back}
        className="mb-4 w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
      >
        <ArrowLeft size={20} color="#374151" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-gray-800 mb-2">Contact Us</Text>

      <TouchableOpacity
        className="mt-6 bg-blue-500 px-4 py-2 rounded-full"
        onPress={handleEmailPress}
      >
        <Text className="text-white font-semibold">Email Support</Text>
      </TouchableOpacity>
    </View>
  );
}
