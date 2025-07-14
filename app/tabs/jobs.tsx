import { Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import JobCard from "../../components/JobCard";
import { mockJobs } from "../../data/mockJobs";
import { useJobAction } from "@/contexts/JobActionContext";
import "../../global.css";

export default function Jobs() {
  const { addToChosen, addToRefused } = useJobAction();

  return (
    <View className="flex-1 bg-gray-50 px-4 py-4 items-center justify-center">
      <Swiper
        cards={mockJobs}
        renderCard={(job) =>
          job ? <JobCard job={job} /> : <Text>No more jobs</Text>
        }
        stackSize={4}
        stackSeparation={-20}
        cardIndex={0}
        verticalSwipe={false}
        backgroundColor="transparent"
        cardStyle={{ width: "90%", alignSelf: "center" }}
        onSwipedRight={(index) => {
          addToChosen(mockJobs[index]);
          console.log("Chosen:", mockJobs[index]);
        }}
        onSwipedLeft={(index) => {
          addToRefused(mockJobs[index]);
          console.log("Refused:", mockJobs[index]);
        }}
      />
    </View>
  );
}
