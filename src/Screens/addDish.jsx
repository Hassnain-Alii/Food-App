import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";
import {
  Chip,
  Text,
  Icon,
  Dialog,
  Input as RneInput,
  Card,
} from "@rneui/themed";
import { Header, Button, Input } from "../components";
import { colors } from "../utils/theme";
import { ChooseMedia } from "../components/chooseMedia";
import { getStoredValue, makeBlobFromUri } from "../utils/help";
import { firestore, storage } from "../services/db";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function addDish({ navigation }) {
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [pictureUri, setPictureUri] = useState("");
  const [showMedia, setShowMedia] = useState(false);
  const [showIngredientModel, setShowIngredientModel] = useState(false);
  const [dishType, setDishType] = useState("");
  const [ingName, setIngName] = useState("");
  const [ingCount, setIngCount] = useState(0);
  const [ingData, setIngData] = useState([]);
  const [Loading, setLoading] = useState();
  const [selectedDishType, setSelectedDishType] = useState("");

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
  const onAddIngredientPress = () => {
    setShowIngredientModel(!showIngredientModel);
  };

  const onDishIngAdded = () => {
    const ingredient = {
      ingName,
      ingCount,
    };
    ingData.push(ingredient);
    setIngData(ingData);

    setIngName("");
    setIngCount(0);
    setShowIngredientModel(false);
  };
  const onIngredientLongPress = (index) => {
    Alert.alert(
      "Delete Ingredient",
      "Are you sure you want to delete this ingredient?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDeleteIngredient(index),
        },
      ]
    );
  };

  const onDeleteIngredient = (index) => {
    const updatedIngData = [...ingData];
    updatedIngData.splice(index, 1);
    setIngData(updatedIngData);
  };

  const onDishSubmit = async () => {
    try {
      setLoading(true);

      const imgBlob = await makeBlobFromUri(pictureUri);
      const uid = await getStoredValue("uid");
      const imgName = `dish_${uid}${Math.random(2)}.png`;
      const storageRef = ref(storage, `dishes/${imgName}`);
      const imageUploaded = await uploadBytes(storageRef, imgBlob);
      const imgUrl = await getDownloadURL(storageRef);
      const dishData = {
        dishName,
        dishDescription,
        imgUrl,
        dishType,
        ingData,
      };
      const dishDocName = `dish_${uid}_${Math.random(2)}.png`;
      const dishuploaded = await setDoc(
        doc(firestore, "dishes", dishDocName),
        dishData
      );
      navigation.goBack();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const onDishTypePress = (type) => {
    setDishType(type);
    setSelectedDishType(type);
    console.log(type);
  };

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <KeyboardAwareScrollView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Header
        onBackBtnPress={() => {
          navigation.goBack();
        }}
        headingText={"Add Dish"}
      />
      <View style={styles.upperCon}>
        <View style={styles.dishNamer}>
          <Input inputTitle={"Dish Name"} onChangeText={setDishName} />
          <Input
            inputTitle={"Dish Description"}
            onChangeText={setDishDescription}
          />
        </View>

        <View style={styles.dishPhoto}>
          <TouchableOpacity style={styles.imgBtn} onPress={onImgPressed}>
            {pictureUri ? (
              <Image
                source={{ uri: pictureUri }}
                style={styles.img}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.phIcon}>
                <Ionicons name="fast-food" size={50} color={colors.primary} />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.btnCon}>
            <Button text={"upload"} />
          </View>
        </View>
      </View>
      <Text h3 style={{ marginLeft: 10 }}>
        Dish Type:
      </Text>
      <View style={styles.bottomCon}>
        <View style={styles.chipsMe}>
          <TouchableOpacity
            style={[
              styles.chipCon,
              selectedDishType === "Sweets" && {
                backgroundColor: "red",
                height: 44,
                width: "32%" /* other styles */,
              },
            ]}
            onPress={() => onDishTypePress("Sweets")}
          >
            <Text style={styles.chipsText}>Sweets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chipCon,
              selectedDishType === "Vege" && {
                backgroundColor: "red",
                height: 44,
                width: "32%",
                /* other styles */
              },
            ]}
            onPress={() => onDishTypePress("Vege")}
          >
            <Text style={styles.chipsText}>Vege</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chipCon,
              selectedDishType === "Non-Vege" && {
                backgroundColor: "red",
                height: 44,
                width: "32%",
                /* other styles */
              },
            ]}
            onPress={() => onDishTypePress("Non-Vege")}
          >
            <Text style={styles.chipsText}>Non-Vege</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.addIngredeientHeadingCon]}>
          <Text h3>Add Ingredient</Text>
          <Icon
            name={"add"}
            type={"ionicons"}
            reverse
            color={colors.primary}
            size={14}
            onPress={onAddIngredientPress}
          />
        </View>
        <FlatList
          data={ingData}
          renderItem={({ item, index }) => (
            <TouchableOpacity onLongPress={() => onIngredientLongPress(index)}>
              <Card>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text h5 h5Style={{ fontWeight: "light" }}>
                    {item.ingName}
                  </Text>
                  <Text h5>{item.ingCount}g</Text>
                </TouchableOpacity>
              </Card>
            </TouchableOpacity>
          )}
        />

        <View
          style={[styles.btnCon, { marginBottom: 30 /* Adjust as needed */ }]}
        >
          <Button text={"Submit"} onBtnPress={onDishSubmit} />
        </View>
      </View>
      <ChooseMedia
        show={showMedia}
        onClosePressed={onImgPressed}
        onPictureTaken={handlePictureSource}
      />
      {showIngredientModel && (
        <Dialog>
          <Dialog.Title title={"Add This Ingredient"} />
          <RneInput placeholder={"Ingredient Name"} onChangeText={setIngName} />

          <RneInput
            placeholder={"Ingredient count"}
            onChangeText={setIngCount}
            keyboardType={"numeric"}
          />
          <Dialog.Button title={"Add"} onPress={onDishIngAdded} />
          <Dialog.Button title={"close"} onPress={onAddIngredientPress} />
        </Dialog>
      )}
      <Spinner visible={Loading} />
    </View>
    //   </KeyboardAwareScrollView>
    //  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperCon: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomCon: {
    flex: 1.4,
  },
  dishNamer: {
    width: "60%",
    paddingLeft: 10,
    justifyContent: "center",
  },
  dishPhoto: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
    resizeMode: "contain",
  },
  imgBtn: {
    alignSelf: "center",
    backgroundColor: "yellow",
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  phIcon: {
    padding: 20,
  },

  btnCon: {
    width: "80%",
    height: 40,
    alignSelf: "center",
    margin: 5,
    marginTop: 10,
    // marginLeft: 5,
    // padding
  },

  chipsMe: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  chipsText: {
    color: "white",
  },
  chipCon: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "30%",
    margin: 5,
    backgroundColor: "black",
    borderRadius: 100,
  },
  addIngredeientHeadingCon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
});
