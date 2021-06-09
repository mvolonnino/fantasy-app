import React from "react";
import { Button } from "react-native-elements";

const ShowConfDivBtn = ({ title, state, onPress }) => {
  return (
    <Button
      title={title}
      type={`${title === state ? "solid" : "outline"}`}
      onPress={() => onPress(title)}
      titleStyle={{ fontSize: 11 }}
      buttonStyle={{ height: 40 }}
    />
  );
};

export default ShowConfDivBtn;
