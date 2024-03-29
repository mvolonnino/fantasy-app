import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";

import {
  useFetchAllTeams,
  useSortConferences,
  useSortDivisions,
} from "../../hooks";
import {
  ScoresContainer,
  LeagueContainer,
  ConferenceContainer,
  DivisionContainer,
  PageTitleButtons,
} from "../../components";

const { height, width } = Dimensions.get("window");

const Home = () => {
  const scrollViewRef = useRef(null);
  const { data, error, loading } = useFetchAllTeams();
  const { conferences } = useSortConferences(data);
  const { divisions } = useSortDivisions(data);
  const [conference, setConference] = useState("Eastern");
  const [division, setDivision] = useState("MassMutual East");
  const [pages, setPages] = useState({
    League: true,
    Conference: false,
    Division: false,
  });

  const handlePressConf = (title) => {
    if (conference === title) return;
    setConference(title);
  };

  const handlePressDiv = (title) => {
    if (division === title) return;
    setDivision(title);
  };

  const handleSwipeIndicator = ({ event, idx }) => {
    if (event) {
      event.persist();
      const { x } = event.nativeEvent.contentOffset;
      if (x <= 214) {
        setPages({
          League: true,
          Conference: false,
          Division: false,
        });
      }
      if (x > 214 && x < 642) {
        setPages({
          League: false,
          Conference: true,
          Division: false,
        });
      }
      if (x >= 642) {
        setPages({
          League: false,
          Conference: false,
          Division: true,
        });
      }
    } else {
      if (idx === 0) {
        setPages({
          League: true,
          Conference: false,
          Division: false,
        });
        handleScroll(0);
      }
      if (idx === 1) {
        setPages({
          League: false,
          Conference: true,
          Division: false,
        });
        handleScroll(1);
      }
      if (idx === 2) {
        setPages({
          League: false,
          Conference: false,
          Division: true,
        });
        handleScroll(2);
      }
    }
  };

  const handleScroll = (pageNumber) => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: width * pageNumber,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#051426" />
        </View>
      ) : (
        <>
          {/* <View style={styles.headerContainer}>
              <Text style={styles.headerText}>National League </Text>
            </View> */}
          <View style={styles.container}>
            <ScoresContainer teams={data} />
            <View>
              <View style={styles.pagesHeaderBtns}>
                <PageTitleButtons
                  pages={pages}
                  handleSwipeIndicator={handleSwipeIndicator}
                  styles={styles}
                />
              </View>
            </View>
            <ScrollView
              snapToInterval={width}
              decelerationRate="fast"
              horizontal={true}
              style={styles.teamsContainer}
              onMomentumScrollEnd={(event) => handleSwipeIndicator({ event })}
              ref={scrollViewRef}
              showsHorizontalScrollIndicator={false}
            >
              <LeagueContainer data={data} styles={styles} />
              <ConferenceContainer
                conferences={conferences}
                styles={styles}
                handlePressConf={handlePressConf}
                conference={conference}
              />
              <DivisionContainer
                divisions={divisions}
                styles={styles}
                handlePressDiv={handlePressDiv}
                division={division}
              />
            </ScrollView>
          </View>
        </>
      )}
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    height: height - height * 0.9,
    backgroundColor: "#051426",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    marginTop: 30,
    fontSize: 26,
    color: "white",
    alignItems: "center",
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.25,
    borderBottomColor: "lightgray",
    borderTopWidth: 0.25,
    borderTopColor: "lightgray",
  },
  teamsContainer: {
    flex: 1,
  },
  imageThumbnail: {
    height: 100 / 2,
    width: 150 / 2,
  },
  textContainer: {
    marginLeft: 10,
  },
  pagesHeaderBtns: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 5,
    // backgroundColor: "#051426",
  },
  pageTextIndicator: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "#051426",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  pageText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  leagueContainer: {
    flex: 1,
    width: width,
  },
  headerBtns: {
    width: width,
    flexDirection: "row",
  },
  btns: {
    flex: 1,
  },
});

export default Home;
