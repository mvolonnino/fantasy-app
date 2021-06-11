import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "react-native-vector-icons";
import { ScrollView as GestureHanlderScrollView } from "react-native-gesture-handler";

import { useFetchLiveScores } from "../hooks";
import { ScoreCard, ScoreCard2 } from "../components";

const { width } = Dimensions.get("window");

const ScoresContainer = ({ teams }) => {
  const [refresh, setRefresh] = useState(false);
  const { data, error, loading } = useFetchLiveScores({
    teams,
    refresh,
    setRefresh,
  });

  const handleRefresh = () => {
    setRefresh(true);
  };

  // console.log({ data, error, loading });

  return (
    <View style={styles.scoreBox}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#051426" />
        </View>
      ) : (
        <View style={styles.liveScoresContainer}>
          <View style={styles.date}>
            <Text style={styles.liveScoresText}>
              ({data.games.length}gp) Scores for {data.date.pretty}:{" "}
            </Text>
            <TouchableOpacity onPress={() => handleRefresh()}>
              <SimpleLineIcons
                name="refresh"
                size={20}
                style={styles.refreshIcon}
              />
            </TouchableOpacity>
          </View>

          <GestureHanlderScrollView
            horizontal={true}
            snapToInterval={width}
            syles={styles.scoreCardContainer}
            showsHorizontalScrollIndicator={false}
          >
            {data.games.map((game, idx) => (
              // <ScoreCard game={game} key={idx} />
              <ScoreCard2 game={game} key={idx} />
            ))}
          </GestureHanlderScrollView>
        </View>
      )}

      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBox: {
    padding: 5,
    height: 265,
    justifyContent: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  loadingContainer: {
    justifyContent: "center",
  },
  scoreCardContainer: {
    flex: 1,
  },
  liveScoresContainer: {
    padding: 10,
  },
  liveScoresText: {
    fontSize: 16,
    fontWeight: "700",
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ScoresContainer;
