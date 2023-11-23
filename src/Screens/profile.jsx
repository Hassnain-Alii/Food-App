import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Button, Input } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/theme";
import Spinner from "react-native-loading-spinner-overlay";
import { auth, firestore, storage } from "../services/db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStoredValue, makeBlobFromUri, setStoredValue } from "../utils/help";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { ChooseMedia } from "../components/chooseMedia";

function profile({ navigation }) {
  const [profileName, setProfileName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileGender, setProfileGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [pictureUri, setPictureUri] = useState("");
  useEffect(() => {
    attemptToFetchUserDetails();
  }, []);

  const attemptToFetchUserDetails = async () => {
    try {
      setLoading(true);
      const uid = await getStoredValue("uid");
      const userDocRef = doc(firestore, "Users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { email, name, gender } = userDoc.data();
        setProfileName(name);
        setProfileEmail(email);
        setProfileGender(gender);

        if (userDoc.data().profileDP) {
          setPictureUri(userDoc.data().profileDP);
        }
      } else {
        alert("no data exist");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const blobResponse = await makeBlobFromUri(pictureUri);
      const uid = await getStoredValue("uid");

      const storageRef = ref(storage, `profile_Picture/user_pic${uid}.png`);

      const uploadResponse = await uploadBytes(storageRef, blobResponse);
      if (uploadResponse) {
        const uploadedImageUrl = await getDownloadURL(storageRef);

        const setUserData = await setDoc(doc(firestore, "Users", uid), {
          name: profileName,
          email: profileEmail,
          gender: profileGender,
          profileDP: uploadedImageUrl,
        });
        alert("Profile data updated");
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const onImgPressed = () => {
    if (showMedia === true) {
      setShowMedia(false);
    } else {
      setShowMedia(true);
    }
  };

  const handlePictureSource = (source) => {
    setPictureUri(source);
    onImgPressed();
  };

  const onLogoutPress = () => {
    setStoredValue("isLoggedIn", "false");
    setStoredValue("uid", "");
    navigation.replace("Login");
  };
  return (
    <>
      <View>
        <Header
          headingText={"Profile"}
          showBackBtn={false}
          onRightBtnPress={onLogoutPress}
          rightBtnText={"Logout"}
        />
        <TouchableOpacity style={styles.imgBtn} onPress={onImgPressed}>
          {pictureUri ? (
            <Image
              source={{ uri: pictureUri }}
              style={styles.img}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imgIcon}>
              <Ionicons name="person-outline" size={33} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.form}>
          <Input
            inputTitle={"name"}
            onChangeText={setProfileName}
            autoCapitalize={true}
            error={errorName}
            valid={!errorName}
            errorMsg={errorName}
            value={profileName}
          />

          <Input
            inputTitle={"email"}
            onChangeText={setProfileEmail}
            autoCapitalize={true}
            valid={true}
            value={profileEmail}
            isEditable={false}
          />

          <View style={styles.genderContainer}>
            <Text style={styles.genderText}>Gender :</Text>
            <View style={styles.radioButtonCon}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  profileGender === "Male" && styles.radioButtonSelected,
                ]}
                onPress={() => {
                  setProfileGender("Male");
                }}
              >
                <Text style={styles.radioButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  profileGender === "Female" && styles.radioButtonSelected,
                ]}
                onPress={() => {
                  setProfileGender("Female");
                }}
              >
                <Text style={styles.radioButtonText}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonCon}>
            <Button text={"Update Profile"} onBtnPress={onSubmit} />
          </View>
        </View>
        <Spinner visible={loading} />
      </View>
      <ChooseMedia
        show={showMedia}
        onClosePressed={onImgPressed}
        onPictureTaken={handlePictureSource}
      />
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  buttonCon: {
    height: 45,
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
  },
  genderContainer: {
    alignSelf: "center",
    flexDirection: "row",
  },
  genderText: {
    marginTop: 13,
    marginVertical: 10,
  },
  radioButtonCon: {
    flexDirection: "row",
    padding: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.black,
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
  imgBtn: {
    alignSelf: "center",
  },
  imgIcon: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 100,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
    resizeMode: "contain",
  },
});
export default profile;
