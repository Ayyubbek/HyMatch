import { Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import JobCard from "../../components/JobCard";
import { mockJobs } from "../../data/mockJobs";
import "../../global.css";

export default function Jobs() {
  return (
    <View className="flex-1 bg-gray-50 px-4 py-4 items-center justify-center">
      <Swiper
        cards={mockJobs}
        renderCard={(job) =>
          job ? <JobCard job={job} /> : <Text>No more jobs</Text>
        }
        stackSize={3}
        stackSeparation={15}
        cardIndex={0}
        verticalSwipe={false}
        backgroundColor="transparent"
        cardStyle={{ width: "90%", alignSelf: "center" }}
        onSwiped={(index) => console.log("Swiped:", index)}
        onSwipedRight={(index) => console.log("Liked:", mockJobs[index])}
        onSwipedLeft={(index) => console.log("Skipped:", mockJobs[index])}
      />
    </View>
  );
}
