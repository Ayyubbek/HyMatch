import CompactJobCard from "@/components/CompactJobCard";
import { useJobAction } from "@/contexts/JobActionContext";
import { ScrollView, Text } from "react-native";
import "../../global.css";

export default function Chosen() {
  const { chosenJobs, addToRefused, removeFromChosen } = useJobAction();

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-4">
      <Text className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Chosen Jobs
      </Text>
      {chosenJobs.length === 0 ? (
        <Text className="text-gray-600 text-center px-6">
          Hali hech qanday ish tanlanmadi.
        </Text>
      ) : (
        chosenJobs.map((job, i) => (
          <CompactJobCard
            key={i}
            job={job}
            mode="chosen"
            onRefuse={() => {
              addToRefused(job);
              removeFromChosen(job.id);
            }}
            onDelete={() => removeFromChosen(job.id)}
          />
        ))
      )}
    </ScrollView>
  );
}
