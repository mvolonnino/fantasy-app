import React from "react";
import { ScrollView } from "react-native";
import { RenderTeam } from "../shared";

const LeagueContainer = ({ data, styles }) => {
  return (
    <ScrollView style={styles.leagueContainer}>
      {data.map((team) => (
        <RenderTeam team={team} styles={styles} key={team._id} />
      ))}
    </ScrollView>
  );
};

export default LeagueContainer;
