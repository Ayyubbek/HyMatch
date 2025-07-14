import { Slot } from "expo-router";
import { JobActionProvider } from "@/contexts/JobActionContext";

export default function RootLayout() {
  return (
    <JobActionProvider>
      <Slot />
    </JobActionProvider>
  );
}
