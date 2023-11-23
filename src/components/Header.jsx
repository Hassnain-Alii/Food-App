import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
function Header({
  onBackBtnPress,
  headingText,
  showBackBtn = true,
  onRightBtnPress,
  rightBtnText,
}) {
  return (
    <View style={styles.container}>
      {showBackBtn === true && (
        <TouchableOpacity onPress={onBackBtnPress}>
          <MaterialIcons name={"arrow-back"} size={35} color={"black"} />
        </TouchableOpacity>
      )}
      <View style={styles.textCon}>
        <Text style={styles.headingText}>{headingText}</Text>
        <TouchableOpacity style={styles.rightBtonCon} onPress={onRightBtnPress}>
          <Text style={styles.rightBtnText}>{rightBtnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    paddingLeft: 10,
    marginTop: 40,
  },
  textCon: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: 29,
    fontWeight: "500",
  },
  rightBtonCon: {
    margin: 5,
    marginRight: 10,
  },
  rightBtnText: {
    fontSize: 15,
    color: "red",
    fontWeight: "500",
  },
});
export { Header };
