import React from "react";
import { ScrollView, View } from "react-native";
import { ShowConfDivBtn, RenderTeam } from "../shared";

const ConferenceContainer = ({
  conferences,
  styles,
  handlePressConf,
  conference,
}) => {
  return (
    <View style={styles.leagueContainer}>
      <View style={styles.headerBtns}>
        {Object.keys(conferences).map((_conference, idx) => (
          <View style={styles.btns} key={idx}>
            <ShowConfDivBtn
              title={_conference}
              state={conference}
              onPress={handlePressConf}
            />
          </View>
        ))}
      </View>
      <ScrollView style={styles.teams}>
        {conferences[conference].map((team) => (
          <RenderTeam team={team} styles={styles} key={team._id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ConferenceContainer;
