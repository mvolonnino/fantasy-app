<script src="http://localhost:8097"></script>;
import React from "react";
import { StyleSheet, Text } from "react-native";

import { UserProvider } from "./context";
import { Landing } from "./screens";

export default function App() {
  return (
    <UserProvider>
      <Landing />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
