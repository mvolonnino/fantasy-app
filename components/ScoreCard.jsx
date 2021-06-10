import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { Transition, Transitioning } from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={300} />
  </Transition.Together>
);

const ScoreCard = ({ game }) => {
  const ref = useRef(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const home = game.teams.home.abbreviation;
  const away = game.teams.away.abbreviation;
  const homeScore = game.scores[home];
  const awayScore = game.scores[away];
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

  const handleAccordion = () => {
    ref.current.animateNextTransition();
    setShowMoreInfo(!showMoreInfo);
  };

  return (
    <>
      <Transitioning.View
        style={styles.cardContainer}
        transition={transition}
        ref={ref}
      >
        <View style={styles.card}>
          <View style={styles.heading}>
            <View style={styles.score}>
              <Text>
                <Text style={{ fontWeight: "bold" }}>
                  {game.status.state} {overtime && `(${OT}) `}
                </Text>
                {`${away}: ${awayScore} @ ${home}: ${homeScore}`}
              </Text>
            </View>
            {playoff && (
              <Text>{`Playoff Series: ${home}: ${playoff.wins[home]}  ${away}: ${playoff.wins[away]}`}</Text>
            )}
          </View>
          {showMoreInfo && (
            <ScrollView
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
            </ScrollView>
          )}
          <TouchableOpacity
            style={styles.moreInfo}
            onPress={() => handleAccordion()}
          >
            {showMoreInfo ? (
              <MaterialIcons name="expand-less" size={26} />
            ) : (
              <MaterialIcons name="expand-more" size={26} />
            )}
          </TouchableOpacity>
        </View>
      </Transitioning.View>
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
    backgroundColor: "#c5cdd6",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    margin: 5,
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
    backgroundColor: "white",
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
});

export default ScoreCard;
