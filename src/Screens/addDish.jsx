import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  // KeyboardAwareScrollView,
  SafeAreaView,
  Keyboard,
  StatusBar,
  // scro
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function addDish({ navigation, newDish }) {
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
  const [dishPrice, setDishPrice] = useState(""); // New state for dish price

  const onImgPressed = () => {
    if (showMedia === true) {
      setShowMedia(false);
    } else {
      setShowMedia(true);
    }
  };
  // statusbar.hidden(false);
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

  const onDishSubmit = () => {
    console.log("onDishSubmit triggered");
    if (
      !dishName ||
      !dishDescription ||
      !pictureUri ||
      !dishType ||
      !dishPrice ||
      ingData.length === 0
    ) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all required fields."
      );
      return;
    }

    // Create a new dish object with all the data

    const newDish = {
      dishName,
      dishDescription,
      imgUrl: pictureUri,
      dishType,
      ingData, // Create a copy of ingData for this dish
      dishPrice,
    };
    console.log("New Dish:", newDish); // Add this line to log the new dish data

    // Navigate to Dishes screen and pass the new dish data
    navigation.navigate("Dishes", { newDish });
  };

  const onDishTypePress = (type) => {
    setDishType(type);
    setSelectedDishType((prevType) => (prevType === type ? "" : type));
  };

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       setIsKeyboardOpen(true);
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     () => {
  //       setIsKeyboardOpen(false);
  //     }
  //   );
  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header
            onBackBtnPress={() => {
              navigation.goBack();
            }}
            headingText={"Add Dish"}
          />
          <View style={styles.upperCon}>
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
                    <Ionicons
                      name="fast-food"
                      size={50}
                      color={colors.primary}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.dishNamer}>
              <Input inputTitle={"Dish Name"} onChangeText={setDishName} />
              <Input
                inputTitle={"Dish Description"}
                onChangeText={setDishDescription}
              />
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
            <View style={styles.flatList}>
              <FlatList
                data={ingData}
                ListEmptyComponent={<NoIngredientFound />}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onLongPress={() => onIngredientLongPress(index)}
                  >
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
            </View>
            <View style={styles.priceInputCon}>
              <Input
                inputTitle={"Dish Price"}
                onChangeText={setDishPrice}
                keyboardType={"numeric"}
                onRightText={"$"}
              />
            </View>
          </View>
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
            <RneInput
              placeholder={"Ingredient Name"}
              onChangeText={setIngName}
            />

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
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
function NoIngredientFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 60,
      }}
    >
      <Text>No Ingredient found 😢</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperCon: {
    // flex: 0.6,
    // flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomCon: {
    flex: 1.4,
  },
  dishNamer: {
    width: "95%",
    paddingLeft: 10,
    justifyContent: "center",
  },

  dishPhoto: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
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
  flatList: {
    flex: 1,
    // position: "absolute",
  },
  addIngredeientHeadingCon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    // position: "absolute",
    // top: 7/0,
  },
  priceInputCon: {
    width: "80%",
    alignSelf: "center",
    margin: 5,
    marginTop: 10,
  },
});
