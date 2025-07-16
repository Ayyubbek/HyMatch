import { useJobAction } from "@/contexts/JobActionContext";
import { LinearGradient } from "expo-linear-gradient";
import { Check, X } from "lucide-react-native";
import { Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import JobCard from "../../components/JobCard";
import { mockJobs } from "../../data/mockJobs";
import "../../global.css";

export default function Jobs() {
  const { addToChosen, addToRefused } = useJobAction();

  return (
    <View className="flex-1 px-4 py-4 items-center justify-center bg-white z-0">
      <View className="w-full h-full z-10 bg-transparent">
        <Swiper
          cards={mockJobs}
          renderCard={(job) =>
            job ? (
              <JobCard job={job} />
            ) : (
              <Text className="text-center text-black">No more jobs</Text>
            )
          }
          stackSize={3}
          stackSeparation={15}
          cardIndex={0}
          verticalSwipe={false}
          backgroundColor="transparent"
          cardStyle={{ width: "90%", alignSelf: "center" }}
          onSwiped={(index) => console.log("Swiped:", index)}
          onSwipedRight={(index) => {
            const job = mockJobs[index];
            console.log("Liked:", job);
            addToChosen(job);
          }}
          onSwipedLeft={(index) => {
            const job = mockJobs[index];
            console.log("Skipped:", job);
            addToRefused(job);
          }}
          overlayLabels={{
            left: {
              title: "REFUSE",
              style: {
                label: { display: "none" },
                wrapper: {
                  position: "absolute",
                  top: 30,
                  right: 20,
                  zIndex: 1000,
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
              element: (
                <LinearGradient
                  colors={["#fee2e2", "#fecaca"]}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: 65,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#dc2626",
                  }}
                >
                  <X size={36} color="#dc2626" />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#dc2626",
                    }}
                  >
                    REFUSE
                  </Text>
                </LinearGradient>
              ),
            },
            right: {
              title: "CHOSEN",
              style: {
                label: { display: "none" },
                wrapper: {
                  position: "absolute",
                  top: 30,
                  left: 20,
                  zIndex: 1000,
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
              element: (
                <LinearGradient
                  colors={["#DDFBE7", "#DDFBE7"]}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: 65,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#16a34a",
                  }}
                >
                  <Check size={36} color="#16a34a" />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#16a34a",
                    }}
                  >
                    CHOOSE
                  </Text>
                </LinearGradient>
              ),
            },
          }}
        />
      </View>
    </View>
  );
}
