import React from "react";
import { View, Image, Text } from "react-native";

const RenderTeam = ({ team, styles }) => {
  return (
    <View style={styles.teamInfo}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: team.picture }} style={styles.imageThumbnail} />
      </View>
      <View style={styles.textContainer}>
        <Text>{team.name}</Text>
      </View>
    </View>
  );
};

export default RenderTeam;
