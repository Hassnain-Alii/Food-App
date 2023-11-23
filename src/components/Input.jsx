import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/theme";

function Input({
  inputTitle,
  onChangeText,
  isSecure = false,
  keyboardType,
  autoCapitalize,
  value,
  isEditable = true,
  error,
  errorMsg,
  valid,
  isPassword = false,
}) {
  const [showPassword, setShowPassword] = useState(isPassword);
  const shakeAnimationValue = new Animated.Value(0);

  useEffect(() => {
    if (error) {
      shakeAnimation();
    }
  }, [error]);
  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimationValue, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const inputStyle = {
    transform: [{ translateX: shakeAnimationValue }],
  };
  return (
    <>
      <View style={styles.container}>
        {isPassword && (
          <View>
            <TouchableOpacity
              style={styles.secureTextContainer}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Text style={styles.secureText}>
                {showPassword ? "Show" : "Hide"}
              </Text>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                color={"red"}
                size={17}
              />
            </TouchableOpacity>
          </View>
        )}
        <Animated.View
          style={[
            styles.inputCon,
            error && { borderColor: "red", borderWidth: 1 },
            inputStyle,
          ]}
        >
          <Text style={[styles.title, error && { color: "red" }]}>
            {inputTitle.toUpperCase()}
          </Text>
          <View style={styles.inputSubCon}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              secureTextEntry={showPassword}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              value={value}
              editable={isEditable}
            />
            {error && <Ionicons name={"close"} size={20} color={"red"} />}
            {valid && <Ionicons name={"checkmark"} size={20} color={"green"} />}
          </View>
        </Animated.View>

        {error && (
          <Text style={{ fontSize: 10, color: "red" }}>{errorMsg}</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputCon: {
    marginVertical: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    height: 60,
  },
  inputSubCon: {
    flexDirection: "row",
  },
  input: {
    width: "93%",
  },
  title: {
    fontSize: 10,
  },
  secureTextContainer: {
    paddingRight: 10,
    marginTop: 5,
    marginBottom: -7,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  secureText: {
    marginRight: 5,
  },
});
export { Input };
