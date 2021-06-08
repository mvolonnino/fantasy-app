import React from "react";
import { TouchableOpacity, Text } from "react-native";

const PageTitleButtons = ({ pages, handleScroll, styles }) => {
  return (
    <>
      {Object.entries(pages).map((page, idx) => (
        <TouchableOpacity
          onPress={() => handleScroll(idx)}
          style={page[1] ? styles.pageTextIndicator : null}
          key={idx}
        >
          <Text style={styles.pageText}>{page}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default PageTitleButtons;
