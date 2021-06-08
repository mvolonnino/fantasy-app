import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-elements";

const ConferenceContainer = ({
  conferences,
  styles,
  renderTeam,
  handlePressConf,
  conference,
}) => {
  return (
    <ScrollView style={styles.leagueContainer}>
      <View style={styles.headerBtns}>
        {Object.keys(conferences).map((_conference, idx) => (
          <View style={styles.btns} key={idx}>
            <Button
              title={_conference}
              type={`${_conference === conference ? "solid" : "outline"}`}
              onPress={() => handlePressConf(_conference)}
            />
          </View>
        ))}
      </View>
      <ScrollView style={styles.teams}>
        {conferences[conference].map((team) => renderTeam(team))}
      </ScrollView>
    </ScrollView>
  );
};

export default ConferenceContainer;
