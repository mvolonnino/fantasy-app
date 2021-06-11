import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  Platform,
} from "react-native";
import * as Google from "expo-google-app-auth";
import { IOS_GOOGLE_CLIENT_ID, ANDROID_GOOGLE_CLIENT_ID } from "@env";
import axios from "axios";

import { GoogleBtn } from "../shared";
import { UserContext } from "../context";

const width = Dimensions.get("window").width;
const OS = Platform.OS;
console.log("Platform OS => ", OS);

const Login = () => {
  let localhost = "localhost";
  let ipAddress = "192.168.1.12";
  const { userDispatch } = useContext(UserContext);
  const [URL, setURL] = useState(
    OS === "ios"
      ? `http://${localhost}:5000/api/v1/user/googlelogin`
      : `http://${ipAddress}:5000/api/v1/user/googlelogin`
  );
  const [error, setError] = useState("");

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: IOS_GOOGLE_CLIENT_ID,
        iosClientId: ANDROID_GOOGLE_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const { idToken } = result;
        axios({
          method: "POST",
          url: URL,
          data: {
            idToken: idToken,
            OS,
          },
        })
          .then((res) => {
            // console.log({ res });
            const { data } = res;
            userDispatch({
              type: "SET_USER",
              user: data.user,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  return (
    <TouchableWithoutFeedback
      style={styles.dismissKeyboard}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.loginContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Muffin Men Fantasy Draft</Text>
        </View>
        <View style={styles.inputContainer}>
          <GoogleBtn
            text="sign in with google"
            onPress={() => signInWithGoogleAsync()}
          />

          {error ? <Text>{error}</Text> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "darkslateblue",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: width - 10,
    paddingLeft: 20,
    paddingBottom: 5,
    color: "darkslateblue",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "darkslateblue",
  },
  dismissKeyboard: {
    flex: 1,
  },
});

export default Login;
