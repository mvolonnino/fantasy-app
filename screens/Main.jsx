import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { UserContext } from "../context";
import { Home, Search, Profile } from "./index";
import { handleTabIcon } from "../helpers";

const Tab = createBottomTabNavigator();

const Main = ({ navigation }) => {
  const { userState } = useContext(UserContext);
  const { user } = userState;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          handleTabIcon({
            route,
            focused,
            color,
            size,
          }),
      })}
      tabBarOptions={{
        activeTintColor: "cyan",
        inactiveTintColor: "lightgray",
        showLabel: false,
        style: {
          backgroundColor: "#051426",
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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
