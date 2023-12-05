import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Header, Button, Input } from "../components";
import { validateEmail } from "../utils/help";
import { auth } from "../services/db";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Forgotpassword({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const onSubmit = async () => {
    if (email === "") {
      setErrorEmail("email is empty");
    } else if (validateEmail(email) === false) {
      setErrorEmail("email is not vaild");
    } else {
      try {
        setLoading(true);
        await sendPasswordResetEmail(auth, email);
        Alert.alert(
          "Password Reset Email Sent",
          "A password reset email has been sent to your email address. Please follow the instructions in the email to reset your password."
        );
        setLoading(false);
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          Alert.alert(
            "User Not Found",
            "The email address entered does not exist. Please check the email address or sign up for a new account."
          );
        } else {
          Alert.alert("Error", error.message);
        }
        setLoading(false);
      }
    }
  };
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
        <Input
          inputTitle={"email"}
          keyboardType={"email-address"}
          onChangeText={setEmail}
          error={errorEmail}
          errorMsg={errorEmail}
          valid={!errorEmail}
        />
        <View
          style={{
            height: 45,
            width: "80%",
            alignSelf: "center",
            marginVertical: 10,
          }}
        >
          <Button text={"Submit"} onBtnPress={onSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
