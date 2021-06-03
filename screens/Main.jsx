import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

import { UserContext } from "../context";

const Main = () => {
  const { userState } = useContext(UserContext);
  const { user } = userState;

  return (
    <View style={styles.container}>
      <Text>{user.name} is logged in!</Text>
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

export default Main;
