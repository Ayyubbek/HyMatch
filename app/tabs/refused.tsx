import CompactJobCard from "@/components/CompactJobCard";
import { useJobAction } from "@/contexts/JobActionContext";
import { ScrollView, Text } from "react-native";
import "../../global.css";

export default function Refused() {
  const { refusedJobs, addToChosen, removeFromRefused } = useJobAction();

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-4">
      <Text className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Refused Jobs
      </Text>
      {refusedJobs.length === 0 ? (
        <Text className="text-gray-600 text-center px-6">
          Hali hech qanday ish rad etilmadi.
        </Text>
      ) : (
        refusedJobs.map((job, i) => (
          <CompactJobCard
            key={i}
            job={job}
            mode="refused"
            onChoose={() => {
              addToChosen(job);
              removeFromRefused(job.id);
            }}
            onDelete={() => removeFromRefused(job.id)}
          />
        ))
      )}
    </ScrollView>
  );
}
