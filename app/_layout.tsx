import { JobActionProvider } from "@/contexts/JobActionContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserProvider } from "@/contexts/UserContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <UserProvider>
        <JobActionProvider>
          <Slot />
        </JobActionProvider>
      </UserProvider>
    </LanguageProvider>
  );
}
