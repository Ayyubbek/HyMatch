import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// Quyidagilar sizda mavjud bo'lishi kerak yoki shunchaki comment qilib turing:
// import { useLanguage } from "@/contexts/LanguageContext";
// import { useTheme } from "@/contexts/ThemeContext";
// import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LinearGradient } from "expo-linear-gradient";
import { Globe, LogOut, Settings, User, X } from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ visible, onClose }: HamburgerMenuProps) {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const { user }: { user: any } = { user: null };
  const { isDarkMode } = { isDarkMode: false };

  const languages = [
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  ];

  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.8)).current;
  const [isMenuRendered, setIsMenuRendered] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsMenuRendered(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH * 0.8,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setIsMenuRendered(false));
    }
  }, [visible]);

  const handleProfilePress = () => {
    onClose();
    router.push({ pathname: "/profile" });
  };

  const handleSettingsPress = () => {
    onClose();
    router.push({ pathname: "/settings" });
  };

  const handleContactPress = () => {
    onClose();
    router.push({ pathname: "/contact" });
  };

  if (!isMenuRendered) {
    return null;
  }

  return (
    <View style={styles.absoluteFill} pointerEvents={visible ? "auto" : "none"}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.overlay,
            isDarkMode && { backgroundColor: "rgba(0,0,0,0.8)" },
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.menu,
          isDarkMode && { backgroundColor: "#18181b" },
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <LinearGradient
          colors={isDarkMode ? ["#23233a", "#18181b"] : ["#667eea", "#764ba2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={[styles.title, isDarkMode && { color: "#fff" }]}>
                Menu
              </Text>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  isDarkMode && { backgroundColor: "rgba(255,255,255,0.08)" },
                ]}
                onPress={onClose}
              >
                <X size={20} color={isDarkMode ? "#fff" : "#ffffff"} />
              </TouchableOpacity>
            </View>

            <View style={styles.userSection}>
              {user ? (
                <View style={styles.userInfo}>
                  <View
                    style={[
                      styles.avatarContainer,
                      isDarkMode && {
                        backgroundColor: "rgba(255,255,255,0.08)",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.avatarText,
                        isDarkMode && { color: "#fff" },
                      ]}
                    >
                      {user.firstName?.charAt(0)}
                      {user.lastName?.charAt(0)}
                    </Text>
                  </View>
                  <Text
                    style={[styles.userName, isDarkMode && { color: "#fff" }]}
                  >
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text
                    style={[
                      styles.userEmail,
                      isDarkMode && { color: "#a1a1aa" },
                    ]}
                  >
                    {user.email}
                  </Text>
                </View>
              ) : (
                <View style={styles.guestSection}>
                  <View
                    style={[
                      styles.avatarContainer,
                      isDarkMode && {
                        backgroundColor: "rgba(255,255,255,0.08)",
                      },
                    ]}
                  >
                    <User size={20} color={isDarkMode ? "#fff" : "#ffffff"} />
                  </View>
                  <Text
                    style={[
                      styles.guestText,
                      isDarkMode && { color: "#a1a1aa" },
                    ]}
                  >
                    Guest User
                  </Text>
                </View>
              )}
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View
          style={[
            styles.menuContent,
            isDarkMode && { backgroundColor: "#18181b" },
          ]}
        >
          <View style={styles.menuItems}>
            <TouchableOpacity
              style={[
                styles.menuItem,
                isDarkMode && { backgroundColor: "#23233a" },
              ]}
              onPress={handleProfilePress}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  isDarkMode && { backgroundColor: "#27272a" },
                ]}
              >
                <User size={18} color={isDarkMode ? "#a5b4fc" : "#667eea"} />
              </View>
              <Text
                style={[styles.menuItemText, isDarkMode && { color: "#fff" }]}
              >
                {t("tabs.profile")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                isDarkMode && { backgroundColor: "#23233a" },
              ]}
              onPress={handleSettingsPress}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  isDarkMode && { backgroundColor: "#27272a" },
                ]}
              >
                <Settings
                  size={18}
                  color={isDarkMode ? "#a5b4fc" : "#667eea"}
                />
              </View>
              <Text
                style={[styles.menuItemText, isDarkMode && { color: "#fff" }]}
              >
                {t("tabs.settings")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                isDarkMode && { backgroundColor: "#23233a" },
              ]}
              onPress={handleContactPress}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  isDarkMode && { backgroundColor: "#27272a" },
                ]}
              >
                <Globe size={18} color={isDarkMode ? "#a5b4fc" : "#667eea"} />
              </View>
              <Text
                style={[styles.menuItemText, isDarkMode && { color: "#fff" }]}
              >
                {t("contact.title")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.languageSection}>
            <Text
              style={[styles.sectionTitle, isDarkMode && { color: "#a1a1aa" }]}
            >
              Language
            </Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  language === lang.code && styles.languageOptionActive,
                  isDarkMode && { backgroundColor: "#23233a" },
                  isDarkMode &&
                    language === lang.code && { borderColor: "#a5b4fc" },
                ]}
                onPress={() => setLanguage(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text
                  style={[
                    styles.languageName,
                    language === lang.code && styles.languageNameActive,
                    isDarkMode && { color: "#fff" },
                    isDarkMode &&
                      language === lang.code && { color: "#a5b4fc" },
                  ]}
                >
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <View
                    style={[
                      styles.languageCheck,
                      isDarkMode && { backgroundColor: "#a5b4fc" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.checkmark,
                        isDarkMode && { color: "#23233a" },
                      ]}
                    >
                      ✓
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={[
                styles.logoutButton,
                isDarkMode && {
                  backgroundColor: "#23233a",
                  borderColor: "#a1a1aa",
                },
              ]}
            >
              <LogOut size={18} color="#EF4444" />
              <Text
                style={[styles.logoutText, isDarkMode && { color: "#EF4444" }]}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...(StyleSheet as any).absoluteFill,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  menu: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "80%",
    maxWidth: 300,
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  headerGradient: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#ffffff",
  },
  userName: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
    marginBottom: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userEmail: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#e0e7ff",
  },
  guestSection: {
    alignItems: "center",
  },
  guestText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#e0e7ff",
    marginTop: 6,
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  menuItems: {
    paddingHorizontal: 20,
    marginBottom: 24,
    paddingTop: 35,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#1f2937",
  },
  languageSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#6b7280",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageOptionActive: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1.5,
    borderColor: "#667eea",
  },
  languageFlag: {
    fontSize: 18,
    marginRight: 12,
  },
  languageName: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#374151",
    flex: 1,
  },
  languageNameActive: {
    color: "#667eea",
    fontFamily: "Inter-SemiBold",
  },
  languageCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#667eea",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    fontSize: 12,
    color: "#ffffff",
    fontFamily: "Inter-Bold",
  },
  bottomSection: {
    marginTop: "auto",
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#EF4444",
    marginLeft: 10,
  },
});
