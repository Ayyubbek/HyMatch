import { JobActionProvider } from "@/contexts/JobActionContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <JobActionProvider>
            <Slot />
          </JobActionProvider>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
