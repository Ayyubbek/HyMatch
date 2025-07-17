import CompactJobCard from "@/components/CompactJobCard";
import { useJobAction } from "@/contexts/JobActionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollView, Text } from "react-native";
import "../../global.css";

export default function Chosen() {
  const { chosenJobs, addToRefused, removeFromChosen } = useJobAction();
  const { t } = useLanguage();
  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-4">
      <Text className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {t("tabs.chosen")}
      </Text>
      {chosenJobs.length === 0 ? (
        <Text className="text-gray-600 text-center px-6">
          {t("chosen.empty")}
        </Text>
      ) : (
        chosenJobs.map((job, i) => (
          <CompactJobCard
            key={i}
            job={{
              ...job,
              title: t(`jobTitles.${job.title}`) || job.title,
              workDays: job.workDays.map((d: string) => t(`days.${d}`)),
              location: t(`locations.${job.location}`) || job.location,
              japaneseLevel:
                t(`jlpt.${job.japaneseLevel}`) || job.japaneseLevel,
              commuteTime: t(`commute.${job.commuteTime}`) || job.commuteTime,
            }}
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
