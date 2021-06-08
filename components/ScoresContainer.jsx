import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useFetchLiveScores } from "../hooks";
import { ScoreCard } from "../components";

const ScoresContainer = () => {
  const { data, error, loading } = useFetchLiveScores();

  // console.log({ data, error, loading });

  return (
    <View style={styles.scoreBox}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <View style={styles.liveScoresContainer}>
          <Text style={styles.liveScoresText}>
            Scores for {data.date.pretty}:{" "}
          </Text>
          {data.games.map((game, idx) => (
            <ScoreCard game={game} key={idx} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBox: {
    justifyContent: "center",
    padding: 10,
  },
  liveScoresContainer: {
    padding: 5,
  },
  liveScoresText: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ScoresContainer;
