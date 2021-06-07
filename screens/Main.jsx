import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Search, Profile } from "./index";
import { handleTabIcon } from "../helpers";

const Tab = createBottomTabNavigator();

const Main = ({ navigation }) => {
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

export default Main;
