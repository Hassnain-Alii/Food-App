import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Header, Button, Input } from "../components";

export default function Forgotpassword({ navigation }) {
  return (
    <View>
      <Header
        headingText={"Forgot Password"}
        onBackBtnPress={() => {
          navigation.goBack("");
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15 }}>
          Please, enter your email address. You will receive a link to create a
          new password via email.
        </Text>
        <Input inputTitle={"email"} keyboardType={"email-address"} />
        <View
          style={{
            height: 45,
            width: "80%",
            alignSelf: "center",
            marginVertical: 10,
          }}
        >
          <Button
            text={"Submit"}
            onBtnPress={() => {
              alert("hello");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
