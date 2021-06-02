import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Login = () => {
  const [email, setEmail] = useState("");
  const [roomID, setRoomID] = useState("");

  console.log({ email, roomID });
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
          <TextInput
            placeholder="email"
            onChangeText={(value) => setEmail(value)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Draft Room ID"
            onChangeText={(value) => setRoomID(value)}
            style={styles.textInput}
          />
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
