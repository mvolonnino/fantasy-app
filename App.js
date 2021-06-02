<script src="http://localhost:8097"></script>;

import React from "react";
import { StyleSheet } from "react-native";

import { Login } from "./screens";

export default function App() {
  return <Login />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
