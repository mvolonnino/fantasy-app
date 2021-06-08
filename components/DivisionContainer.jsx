import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-elements";

const DivisionContainer = ({
  divisions,
  styles,
  renderTeam,
  handlePressDiv,
  division,
}) => {
  return (
    <ScrollView style={styles.leagueContainer}>
      <View style={styles.headerBtns}>
        {Object.keys(divisions).map((_division, idx) => (
          <View style={styles.btns} key={idx}>
            <Button
              title={_division}
              type={`${_division === division ? "solid" : "outline"}`}
              onPress={() => handlePressDiv(_division)}
            />
          </View>
        ))}
      </View>
      <ScrollView style={styles.teams}>
        {divisions[division].map((team) => renderTeam(team))}
      </ScrollView>
    </ScrollView>
  );
};

export default DivisionContainer;
