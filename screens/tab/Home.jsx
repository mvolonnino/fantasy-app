import React, { useCallback, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  RefreshControl,
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

  const renderTeam = (team) => {
    return (
      <View style={styles.teamInfo} key={team._id}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: team.picture }} style={styles.imageThumbnail} />
        </View>
        <View style={styles.textContainer}>
          <Text>{team.name}</Text>
        </View>
      </View>
    );
  };

  const handlePressConf = (title) => {
    if (conference === title) return;
    setConference(title);
  };

  const handlePressDiv = (title) => {
    if (division === title) return;
    setDivision(title);
  };

  const handleSwipeIndicator = (event) => {
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
        <ActivityIndicator size="large" color="#051426" />
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>National League </Text>
            </View>
            <View style={styles.scoresContainer}>
              <ScoresContainer />
            </View>
            <View style={styles.pagesHeaderBtns}>
              <PageTitleButtons
                pages={pages}
                handleScroll={handleScroll}
                styles={styles}
              />
            </View>
            <ScrollView
              snapToInterval={width}
              decelerationRate="fast"
              horizontal={true}
              style={styles.teamsContainer}
              onMomentumScrollEnd={(event) => handleSwipeIndicator(event)}
              ref={scrollViewRef}
            >
              <LeagueContainer
                data={data}
                style={styles.leagueContainer}
                renderTeam={renderTeam}
              />
              <ConferenceContainer
                conferences={conferences}
                styles={styles}
                renderTeam={renderTeam}
                handlePressConf={handlePressConf}
                conference={conference}
              />
              <DivisionContainer
                divisions={divisions}
                styles={styles}
                renderTeam={renderTeam}
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
    flex: 1,
  },
  headerContainer: {
    paddingVertical: height - height * 0.96,
    backgroundColor: "#051426",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 26,
    color: "white",
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
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
    margin: 15,
  },
  pageTextIndicator: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  pageText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  leagueContainer: {
    width: width,
  },
  headerBtns: {
    flex: 1,
    width: width,
    flexDirection: "row",
  },
  btns: {
    flex: 1,
  },
});

export default Home;
