import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView as GestureHanlderScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const ScoreCard2 = ({ game }) => {
  const homeTeam = game.teams.home.teamName;
  const awayTeam = game.teams.away.teamName;
  const time = new Date(game.startTime).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const homeLogo = game.teams.home.picture;
  const awayLogo = game.teams.away.picture;
  const homeAbbr = game.teams.home.abbreviation;
  const awayAbbr = game.teams.away.abbreviation;
  const homeScore = game.scores[homeAbbr];
  const awayScore = game.scores[awayAbbr];
  const { overtime } = game.scores;
  const { goals } = game;
  let OT = "";
  if (overtime) {
    OT = "OT";
  }

  const isPlayoff = () => {
    if (game.currentStats.playoffSeries) {
      const { round, wins } = game.currentStats.playoffSeries;

      return { round, wins };
    } else return false;
  };
  const playoff = isPlayoff();

  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.heading}>
            <View style={styles.whosPlaying}>
              <Text>{`${awayTeam} @ ${homeTeam}`}</Text>
              <Text style={{ fontWeight: "bold" }}>
                {game.status.state} {overtime && `(${OT}) `}
              </Text>
            </View>
            <View style={styles.gameTime}>
              <Text>{time}</Text>
            </View>
          </View>
          <View style={styles.score}>
            <View style={styles.teamInfo}>
              <Image source={{ uri: awayLogo }} style={styles.logo} />
              <Text>{awayTeam}</Text>
            </View>
            <View style={styles.gameScore}>
              <Text
                style={styles.gameScoreText}
              >{`${awayScore} - ${homeScore}`}</Text>
            </View>
            <View style={styles.teamInfo}>
              <Image source={{ uri: homeLogo }} style={styles.logo} />
              <Text>{homeTeam}</Text>
            </View>
          </View>
          {goals.length > 0 ? (
            <GestureHanlderScrollView
              style={styles.expandedGameStats}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {goals.map((goal, i) => (
                <View style={styles.moreGameStatsCard} key={i}>
                  <Text
                    style={styles.goalText}
                  >{`GOAL: ${goal.team}, ${goal.scorer.player} (${goal.scorer.seasonTotal})`}</Text>
                  <View style={styles.assistTextView}>
                    {goal.assists.length > 0 ? (
                      goal.assists.map((assist, i) => (
                        <Text
                          key={i}
                          style={styles.assistText}
                        >{`${assist.player} (${assist.seasonTotal}) `}</Text>
                      ))
                    ) : (
                      <Text style={styles.assistText}>Unassisted</Text>
                    )}
                  </View>
                  <Text
                    style={styles.goalTime}
                  >{`Time: ${goal.min} mins & ${goal.sec} secs of the ${goal.period} period`}</Text>
                </View>
              ))}
            </GestureHanlderScrollView>
          ) : (
            <View style={styles.noGoals}>
              <Text style={styles.noGoalsText}>No Goals Scored Yet</Text>
            </View>
          )}

          {playoff && (
            <View style={styles.playoffSeries}>
              <Text
                style={styles.playoffText}
              >{`Round ${playoff.round} • ${homeAbbr}: ${playoff.wins[homeAbbr]} - ${awayAbbr}: ${playoff.wins[awayAbbr]}`}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    width: width * 0.9,
    padding: 10,
    borderWidth: 0.65,
    borderRadius: 10,
    borderColor: "lightgray",
    backgroundColor: "white",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexGrow: 1,
    flexDirection: "column",
  },
  whosPlaying: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameScore: {
    justifyContent: "center",
    paddingLeft: 5,
  },
  gameScoreText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: 10,
  },
  teamInfo: {
    width: 150 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  moreInfo: {
    margin: 0,
  },
  moreGameStatsCard: {
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    height: 60,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#e1e4e8",
  },
  goalText: {
    fontWeight: "600",
  },
  expandedGameStats: {
    marginTop: 10,
  },
  assistTextView: {
    flexDirection: "row",
  },
  assistText: {
    fontSize: 10,
    fontWeight: "400",
  },
  goalTime: {
    fontSize: 10,
    fontWeight: "300",
  },
  logo: {
    height: 100 / 3,
    width: 150 / 3,
  },
  playoffSeries: {
    justifyContent: "center",
    alignItems: "center",
  },
  playoffText: {
    fontSize: 12,
    fontWeight: "500",
  },
  noGoals: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  noGoalsText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ScoreCard2;
