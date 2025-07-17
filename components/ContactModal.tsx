import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Mail, MessageCircle, Phone, X } from "lucide-react-native";
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactModal() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const handleCall = () => {
    Linking.openURL("tel:+81-3-1234-5678");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@hymatch.jp");
  };

  const handleChat = () => {
    // Open chat support
    console.log("Open chat support");
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && { backgroundColor: "#18181b" }]}
    >
      <View
        style={[
          styles.header,
          isDarkMode && {
            backgroundColor: "#23233a",
            borderBottomColor: "#27272a",
          },
        ]}
      >
        <Text style={[styles.title, isDarkMode && { color: "#fff" }]}>
          {t("contact.title")}
        </Text>
        <TouchableOpacity
          style={[
            styles.closeButton,
            isDarkMode && { backgroundColor: "#23233a" },
          ]}
          onPress={() => router.back()}
        >
          <X size={24} color={isDarkMode ? "#fff" : "#6b7280"} />
        </TouchableOpacity>
      </View>

      <View
        style={[styles.content, isDarkMode && { backgroundColor: "#18181b" }]}
      >
        <Text style={[styles.subtitle, isDarkMode && { color: "#a1a1aa" }]}>
          {t("contact.subtitle") ||
            "Need help? Get in touch with our support team."}
        </Text>

        <TouchableOpacity
          style={[
            styles.contactOption,
            isDarkMode && { backgroundColor: "#23233a" },
          ]}
          onPress={handleCall}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#10B981" }]}>
            <Phone size={24} color="#ffffff" />
          </View>
          <View style={styles.contactInfo}>
            <Text
              style={[styles.contactTitle, isDarkMode && { color: "#fff" }]}
            >
              {t("contact.phone")}
            </Text>
            <Text
              style={[styles.contactDetail, isDarkMode && { color: "#10B981" }]}
            >
              +81-3-1234-5678
            </Text>
            <Text
              style={[styles.contactHours, isDarkMode && { color: "#a1a1aa" }]}
            >
              {t("contact.hours") || "Mon-Fri 9:00-18:00"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.contactOption,
            isDarkMode && { backgroundColor: "#23233a" },
          ]}
          onPress={handleEmail}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#3B82F6" }]}>
            <Mail size={24} color="#ffffff" />
          </View>
          <View style={styles.contactInfo}>
            <Text
              style={[styles.contactTitle, isDarkMode && { color: "#fff" }]}
            >
              {t("contact.email")}
            </Text>
            <Text
              style={[styles.contactDetail, isDarkMode && { color: "#3B82F6" }]}
            >
              support@hymatch.jp
            </Text>
            <Text
              style={[styles.contactHours, isDarkMode && { color: "#a1a1aa" }]}
            >
              {t("contact.emailResponse") || "Response within 24 hours"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.contactOption,
            isDarkMode && { backgroundColor: "#23233a" },
          ]}
          onPress={handleChat}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#F59E0B" }]}>
            <MessageCircle size={24} color="#ffffff" />
          </View>
          <View style={styles.contactInfo}>
            <Text
              style={[styles.contactTitle, isDarkMode && { color: "#fff" }]}
            >
              {t("contact.chat") || "Live Chat"}
            </Text>
            <Text
              style={[styles.contactDetail, isDarkMode && { color: "#F59E0B" }]}
            >
              {t("contact.chatDetail") || "Chat with our team"}
            </Text>
            <Text
              style={[styles.contactHours, isDarkMode && { color: "#a1a1aa" }]}
            >
              {t("contact.chatHours") || "Available 24/7"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#1f2937",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
  },
  contactOption: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#1f2937",
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#3B82F6",
    marginBottom: 4,
  },
  contactHours: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#6b7280",
  },
});
