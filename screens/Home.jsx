import React from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";

import {
  useFetchAllTeams,
  useSortConferences,
  useSortDivisions,
} from "../hooks";

const Home = () => {
  const { data, error, loading } = useFetchAllTeams();
  const { conferences } = useSortConferences(data);
  const { divisions } = useSortDivisions(data);

  console.log({ data, conferences, divisions, error, loading });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#051426" />
      ) : (
        <>
          <Text>Home Screen</Text>
          <Image
            style={styles.imageThumbnail}
            source={{
              uri: "https://imgur.com/gallery/k3ByFR8",
            }}
          />
        </>
      )}

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
  imageThumbnail: {
    width: 50,
    height: 50,
  },
});

export default Home;
