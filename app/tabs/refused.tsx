import { Text, View } from "react-native";
import "../../global.css";

export default function Refused() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-xl font-semibold text-gray-800 mb-4">
        Refused Jobs
      </Text>
      <Text className="text-gray-600 text-center px-6">
        Bu yerda rad etilgan ishlar ko'rsatiladi
      </Text>
    </View>
  );
}
