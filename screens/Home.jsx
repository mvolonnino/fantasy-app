import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { useFetchAllTeams } from "../hooks";

const Home = () => {
  const { data, error, loading } = useFetchAllTeams();
  console.log({ data, error, loading });

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading....</Text> : <Text>Home Screen</Text>}

      {error ? <Text>{error}</Text> : null}
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

export default Home;
