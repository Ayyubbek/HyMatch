import { Slot } from "expo-router";
import { JobActionProvider } from "@/contexts/JobActionContext";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <JobActionProvider>
        <Slot />
      </JobActionProvider>
    </UserProvider>
  );
}
