import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

function CustomHeader() {
  return (
    <View className="flex-row justify-between items-center px-4 py-8 bg-white border-b border-gray-200">
      <TouchableOpacity className="p-2">
        <FontAwesome name="bars" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-gray-800">HyMatch</Text>
      <TouchableOpacity className="p-2">
        <FontAwesome name="sliders" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        header: () => <CustomHeader />,
      }}
    >
      <Tabs.Screen
        name="refused"
        options={{
          title: "Refused",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="times-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chosen"
        options={{
          title: "Chosen",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="check-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
