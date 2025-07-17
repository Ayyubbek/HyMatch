import CompactJobCard from "@/components/CompactJobCard";
import { useJobAction } from "@/contexts/JobActionContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollView, Text } from "react-native";
import "../../global.css";

export default function Refused() {
  const { refusedJobs, addToChosen, removeFromRefused } = useJobAction();
  const { t } = useLanguage();
  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 py-4">
      <Text className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {t("tabs.refused")}
      </Text>
      {refusedJobs.length === 0 ? (
        <Text className="text-gray-600 text-center px-6">
          {t("refused.empty")}
        </Text>
      ) : (
        refusedJobs.map((job, i) => (
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
