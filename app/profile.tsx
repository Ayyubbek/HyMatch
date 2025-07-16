import { useRouter } from "expo-router";
import {
  ArrowLeft,
  UserRound,
  Phone,
  Mail,
  MapPin,
} from "lucide-react-native";
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { useUser } from "@/contexts/UserContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">No user data available.</Text>
        <TouchableOpacity
          onPress={router.back}
          className="mt-4 w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <ArrowLeft size={20} color="#374151" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white pt-16">
      {/* Top Back Button */}
      <View className="px-4">
        <TouchableOpacity
          onPress={router.back}
          className="mb-4 w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <ArrowLeft size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-4">
        {/* Profile Header */}
        <View className="items-center mb-6">
          {user.profilePicture ? (
            <Image
              source={{ uri: user.profilePicture }}
              className="w-24 h-24 rounded-full mb-2"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-2">
              <UserRound size={32} color="#6b7280" />
            </View>
          )}
          <Text className="text-xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </Text>
          <Text className="text-sm text-gray-500">
            {user.age}歳 • {user.nationality}
          </Text>
        </View>

        {/* Contact Info */}
        <View className="space-y-2">
          <View className="flex-row items-center gap-2">
            <Mail size={18} color="#6b7280" />
            <Text className="text-gray-700">{user.email}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Phone size={18} color="#6b7280" />
            <Text className="text-gray-700">{user.phone}</Text>
          </View>
        </View>

        {/* Address */}
        <View className="mt-6 space-y-1">
          <Text className="font-semibold text-gray-800 mb-1">🏠 住所</Text>
          <View className="flex-row items-start gap-2">
            <MapPin size={18} color="#6b7280" />
            <Text className="text-gray-700">
              〒{user.postalCode} {user.prefecture} {user.city}{"\n"}
              {user.address}
            </Text>
          </View>
        </View>

        {/* Stations */}
        <View className="mt-6 space-y-2">
          <Text className="font-semibold text-gray-800">🚉 駅情報</Text>
          <Text className="text-gray-700">
            自宅最寄り駅: {user.nearestStationHome}（徒歩{user.walkTimeHome}分）
          </Text>
          <Text className="text-gray-700">
            学校最寄り駅: {user.nearestStationSchool}（徒歩{user.walkTimeSchool}分）
          </Text>
        </View>

        {/* Visa & Japanese */}
        <View className="mt-6 space-y-2">
          <Text className="font-semibold text-gray-800">🛂 ビザ & 日本語</Text>
          <Text className="text-gray-700">ビザタイプ: {user.visaType}</Text>
          <Text className="text-gray-700">日本語レベル: {user.japaneseLevel}</Text>
        </View>

        {/* Work Preferences */}
        <View className="mt-6 space-y-2">
          <Text className="font-semibold text-gray-800">💼 希望条件</Text>
          <Text className="text-gray-700">
            希望勤務日: {user.preferredDays.join(", ")}
          </Text>
          <Text className="text-gray-700">
            希望職種: {user.preferredJobTypes.join(", ")}
          </Text>
          <Text className="text-gray-700">
            職務経験: {user.workExperience}
          </Text>
        </View>

        {/* Bottom Back Button */}
        <View className="mt-10 items-center">
          <TouchableOpacity
            onPress={router.back}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <ArrowLeft size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
