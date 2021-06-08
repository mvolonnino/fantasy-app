import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const ScoreCard = ({ game }) => {
  const home = game.teams.home.abbreviation;
  const away = game.teams.away.abbreviation;
  const homeScore = game.scores[home];
  const awayScore = game.scores[away];
  return (
    <View style={styles.gameCardContainer}>
      <Text>{game.status.state}:</Text>
      <Text>{`${away}: ${awayScore} @ ${home}: ${homeScore}`}</Text>
      <Pressable></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gameCardContainer: {
    flexDirection: "row",
    padding: 20,
    borderWidth: 0.65,
    borderRadius: 10,
    borderColor: "lightgray",
    margin: 5,
    justifyContent: "space-evenly",
  },
});

export default ScoreCard;
