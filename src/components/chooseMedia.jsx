import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CustomCamera } from "./customCamera";
import * as ImagePicker from "expo-image-picker";

function ChooseMedia({ show, onClosePressed, onPictureTaken }) {
  const [openMediaType, setOpenMediaType] = useState("none");

  const onCameraPress = () => {
    setOpenMediaType("camera");
  };
  ImagePicker.requestMediaLibraryPermissionsAsync();
  const onGalleryPress = () => {
    ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
    })
      .then((response) => {
        console.log(response);
        onPictureTaken(response.uri);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      {openMediaType === "none" && (
        <Modal visible={show} style={{ margin: 0 }} transparent={true}>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.3) ",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={onClosePressed}
            >
              <Ionicons name={"close-circle"} color={"red"} size={40} />
            </TouchableOpacity>
            <View
              style={{
                height: 300,
                width: "100%",
                borderRadius: 20,
                backgroundColor: "white",
              }}
            >
              <View style={styles.chooseMedia}>
                <TouchableOpacity
                  style={styles.chooseIcon}
                  onPress={onGalleryPress}
                >
                  <Ionicons name={"image"} color={"white"} size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chooseIcon}
                  onPress={onCameraPress}
                >
                  <Ionicons name={"camera"} color={"white"} size={40} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {openMediaType === "camera" && (
        <View style={{ flex: 1 }}>
          <CustomCamera
            onClosePressed={() => {
              setOpenMediaType("none");
            }}
            onPictureTaken={(uri) => {
              onPictureTaken(uri);
              setOpenMediaType("none");
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chooseMedia: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chooseIcon: {
    backgroundColor: "orange",
    margin: 50,
    alignSelf: "center",
    padding: 20,
    borderRadius: 50,
    marginTop: 100,
  },
});
export { ChooseMedia };
