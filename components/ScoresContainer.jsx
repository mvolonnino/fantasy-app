import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";

import { useFetchLiveScores } from "../hooks";
import { ScoreCard } from "../components";

const { height, width } = Dimensions.get("window");

const ScoresContainer = () => {
  const { data, error, loading } = useFetchLiveScores();

  // console.log({ data, error, loading });

  return (
    <View style={styles.scoreBox}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View style={styles.liveScoresContainer}>
          <Text style={styles.liveScoresText}>
            ({data.games.length}gp) Scores for {data.date.pretty}:{" "}
          </Text>
          <ScrollView
            horizontal
            snapToInterval={width}
            syles={styles.scoreCardContainer}
            showsHorizontalScrollIndicator={false}
          >
            {data.games.map((game, idx) => (
              <ScoreCard game={game} key={idx} />
            ))}
          </ScrollView>
        </View>
      )}

      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBox: {
    height: height * 0.21,
    justifyContent: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
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
});

export default ScoresContainer;
