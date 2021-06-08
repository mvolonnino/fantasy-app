import React from "react";
import { ScrollView } from "react-native";

const LeagueContainer = ({ data, style, renderTeam }) => {
  return (
    <ScrollView style={style}>
      {data.map((team) => renderTeam(team))}
    </ScrollView>
  );
};

export default LeagueContainer;
