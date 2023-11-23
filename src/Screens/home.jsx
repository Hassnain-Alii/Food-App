import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Header, Button, Input } from "../components";
import { setStoredValue } from "../utils/help";

export default function home({ navigation }) {
  const onLogout = () => {
    setStoredValue("isLogedIn", "false");
    navigation.replace("Login");
  };
  return (
    <View>
      <Header headingText={"Home"} />
      <View Style={styles.form}>
        <View style={styles.buttonCon}>
          <Button text={"Logout"} onBtnPress={onLogout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonCon: {
    height: 45,
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },
  form: {
    padding: 10,
  },
});
