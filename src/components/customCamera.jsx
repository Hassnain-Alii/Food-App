import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";

function CustomCamera({ onClosePressed, onPictureTaken }) {
  const [cameraType, setCameraType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  requestPermission();
  const cameraRef = useRef();

  const onCameraPress = () => {
    cameraRef.current
      .takePictureAsync()
      .then((response) => {
        console.log(response);
        onPictureTaken(response.uri);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onCameraFlipPress = () => {
    if (cameraType === CameraType.front) {
      setCameraType(CameraType.back);
    } else {
      setCameraType(CameraType.front);
    }
  };
  return (
    <Modal
      isVisible={true}
      style={{ margin: 0, marginTop: Platform.OS === "ios" ? 30 : 0 }}
    >
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} ref={cameraRef} type={cameraType}>
          <View style={styles.headerIcon}>
            <TouchableOpacity onPress={onClosePressed}>
              <Ionicons name={"close"} color={"white"} size={50} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomIcon}>
            <TouchableOpacity onPress={onCameraPress}>
              <Ionicons name={"camera"} color={"white"} size={90} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 40 }}
              onPress={onCameraFlipPress}
            >
              <Ionicons name={"camera-reverse"} color={"white"} size={45} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    // marginTop: 40,
    flex: 1,
  },
  bottomIcon: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 100,
    marginLeft: 90,
  },
});
export { CustomCamera };
