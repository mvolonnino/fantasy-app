import React from "react";
import { ScrollView, View } from "react-native";
import { ShowConfDivBtn, RenderTeam } from "../shared";

const DivisionContainer = ({ divisions, styles, handlePressDiv, division }) => {
  return (
    <View style={styles.leagueContainer}>
      <View style={styles.headerBtns}>
        {Object.keys(divisions).map((_division, idx) => (
          <View style={styles.btns} key={idx}>
            <ShowConfDivBtn
              title={_division}
              state={division}
              onPress={handlePressDiv}
            />
          </View>
        ))}
      </View>
      <ScrollView style={styles.teams}>
        {divisions[division].map((team) => (
          <RenderTeam team={team} styles={styles} key={team._id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default DivisionContainer;
