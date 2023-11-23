import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Input, Button } from "../components";
import { colors } from "../utils/theme";

import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getStoredValue, setStoredValue, validateEmail } from "../utils/help";
import { auth } from "../services/db";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignupPress = () => {
    navigation.navigate("Signup");
  };
  const onForgotPress = () => {
    navigation.navigate("Tabs");

    // navigation.navigate("ForgotPassword");
  };

  useEffect(() => {
    getStoredValue("isLoggedIn")
      .then((response) => {
        if (response === "true") {
          navigation.replace("Tabs");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const onSubmit = () => {
    if (password && email) {
      if (validateEmail(email) === false) {
        setErrorEmail("email is not valid");
      } else if (email) {
        setErrorEmail("");
      }
      if (password.length < 6) {
        setErrorPassword("password is less than 6");
      } else if (password) {
        setErrorPassword("");
      }
      if (!errorEmail && !errorEmail) {
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
          .then((response) => {
            setStoredValue("IsLoggedIn", "true");
            setStoredValue("uid", response.user.uid);
            setLoading(false);
            navigation.navigate("Tabs");
          })
          .catch((error) => {
            alert(error.message);
            setLoading(false);
          });
      }
    }
    if (!password || !email) {
      if (email === "") {
        setErrorEmail("email is empty");
      } else if (validateEmail(email) === false) {
        setErrorEmail("email is not valid");
      } else if (email) {
        setErrorEmail("");
      }
      if (password === "") {
        setErrorPassword("password is not valid");
      } else if (password) {
        setErrorPassword("");
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header headingText={"Login"} />
      <View style={styles.form}>
        <Input
          inputTitle={"Email"}
          onChangeText={setEmail}
          error={errorEmail}
          errorMsg={errorEmail}
          valid={!errorEmail}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
        />
        <Input
          inputTitle={"password"}
          isSecure={true}
          onChangeText={setPassword}
          error={errorPassword}
          errorMsg={errorPassword}
          valid={!errorPassword}
          passwordSecurity={true}
          isPassword={true}
        />
        <TouchableOpacity style={styles.forgot} onPress={onForgotPress}>
          <Text>Forgot your password</Text>
          <Ionicons name={"arrow-forward"} color={"#DB3022"} size={30} />
        </TouchableOpacity>
        <View style={styles.buttonCon}>
          <Button text={"Login"} onBtnPress={onSubmit} />
        </View>
        <TouchableOpacity
          style={styles.dontHaveAccount}
          onPress={onSignupPress}
        >
          <Text>Dont have an account signup</Text>
          <Ionicons name={"arrow-forward"} color={"#DB3022"} />
        </TouchableOpacity>
      </View>
      <Spinner visible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  forgot: {
    flexDirection: "row",
  },
  buttonCon: {
    height: 45,
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },
  form: {
    padding: 10,
  },
  dontHaveAccount: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
});
