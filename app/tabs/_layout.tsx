import { HamburgerMenu } from "@/components/HamburgerMenu"; // <-- import qiling
import { useLanguage } from "@/contexts/LanguageContext";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function CustomHeader({ onMenuPress }: { onMenuPress: () => void }) {
  const { t } = useLanguage();
  return (
    <View className="flex-row justify-between items-center px-4 py-8 bg-white border-b border-gray-200">
      <TouchableOpacity className="p-2" onPress={onMenuPress}>
        <FontAwesome name="bars" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-gray-800">{t("app.title")}</Text>
      <TouchableOpacity className="p-2">
        <FontAwesome name="sliders" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {/* Hamburger Menu (Slide Drawer) */}
      <HamburgerMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Bottom Tabs */}
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
          header: () => <CustomHeader onMenuPress={() => setMenuOpen(true)} />, // <-- toggle menyu
        }}
      >
        <Tabs.Screen
          name="refused"
          options={{
            title: t("tabs.refused"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="times-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="jobs"
          options={{
            title: t("tabs.jobs"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="briefcase" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chosen"
          options={{
            title: t("tabs.chosen"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="check-circle" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
