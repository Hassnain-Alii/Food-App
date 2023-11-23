import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../utils/theme";
function Button({ onBtnPress, text }) {
  return (
    <TouchableOpacity onPress={onBtnPress} style={styles.btnContainer}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    height: 60,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  btnText: {
    color: colors.white,
  },
});
export { Button };
