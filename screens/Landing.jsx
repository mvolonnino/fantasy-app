import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Main, Login } from "./index";
import { UserContext } from "../context";

const Stack = createStackNavigator();

const Landing = ({ navigation }) => {
  const { userState } = useContext(UserContext);
  const { user } = userState;

  return (
    <>
      {user ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Main}
              options={{
                headerShown: false,
              }}
              navigation={navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Landing;
