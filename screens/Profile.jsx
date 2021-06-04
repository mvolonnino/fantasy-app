import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

import { UserContext } from "../context";

const Profile = () => {
  const { userState } = useContext(UserContext);
  const { user } = userState;
  return (
    <View style={styles.container}>
      <Text>{user.name}'s Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
