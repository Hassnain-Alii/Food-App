import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { Header, Input, Button } from "../components";
import { colors } from "../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../services/db";
import { setDoc, doc } from "firebase/firestore";
import { validateEmail } from "../utils/help";

export default function Signup({ navigation }) {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!name || !password || !email || !confirmPassword || !gender) {
      if (name === "") {
        setErrorName("Name is not valid");
      } else if (name) {
        setErrorEmail("");
      }
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
      if (confirmPassword === "") {
        setErrorConfirmPassword("confirmPassword is not valid");
      } else if (confirmPassword) {
        setErrorConfirmPassword("");
      }
      if (confirmPassword !== password) {
        setErrorConfirmPassword("password don't match");
        setErrorPassword("password don't match");
      } else if (password && confirmPassword) {
        setErrorPassword("");
        setErrorConfirmPassword("");
      }
      if (gender == "") {
        alert("Select the gender");
      }
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((authResponse) => {
          const { uid } = authResponse.user;
          setDoc(doc(firestore, "Users", uid), {
            name,
            email,
            gender,
          });
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <Header headingText={"Signup"} onBackBtnPress={goBack} />
      <View style={styles.form}>
        <Input
          inputTitle={"Name"}
          onChangeText={setName}
          error={errorName}
          errorMsg={errorName}
          valid={!errorName}
        />

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
        />
        <Input
          inputTitle={"confirm password"}
          isSecure={true}
          onChangeText={setConfirmPassword}
          error={errorConfirmPassword}
          errorMsg={errorConfirmPassword}
          valid={!errorConfirmPassword}
          passwordSecurity={true}
        />
        <View style={styles.genderContainer}>
          <Text style={styles.genderText}>Gender :</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                gender === "Male" && styles.radioButtonSelected,
              ]}
              onPress={() => setGender("Male")}
            >
              <Text style={styles.radioButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                gender === "Female" && styles.radioButtonSelected,
              ]}
              onPress={() => setGender("Female")}
            >
              <Text style={styles.radioButtonText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonCon}>
          <Button text={"Signup"} onBtnPress={onSubmit} />
        </View>
        <TouchableOpacity style={styles.alreadyhaveAccount} onPress={goBack}>
          <Text>Already have an account </Text>
          <Ionicons name={"arrow-forward"} color={colors.primary} />
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
    // marginTop: 300,
    height: 45,
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },
  form: {
    padding: 10,
  },
  alreadyhaveAccount: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  genderContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
  },
  genderText: {
    marginRight: 10,
    marginTop: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
  },
  radioButton: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  radioButtonSelected: {
    backgroundColor: "gray",
  },
  radioButtonText: {
    color: colors.black,
  },
});
