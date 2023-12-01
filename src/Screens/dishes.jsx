import { View, FlatList, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { colors } from "../utils/theme";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  firestore,
  getDocs,
} from "firebase/firestore";
import { ListItem, Avatar, Button } from "@rneui/themed";
import reactotron from "reactotron-react-native";
import Spinner from "react-native-loading-spinner-overlay";

export default function Dishes({ navigation }) {
  const [dishes, setDishes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDishes();
  }, []);

  async function getDishes() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "dishes"));

      let tempData = [];
      querySnapshot.forEach((doc) => {
        let dish = doc.data();
        // let tempData = { data: dish, dishId: doc.id };
        tempData.push({ data: dish, dishId: doc.id });
      });
      console.log("Fetched dishes:", tempData);
      alert("Fetched dishes:", tempData);
      setDishes(tempData);
      setLoading(false);
      setRefresh(false);
    } catch (error) {
      reactotron.logImportant(error.message);
      setLoading(false);
      setRefresh(false);
    }
  }

  async function onDishDeletePress(reset, dish) {
    setLoading(true);
    try {
      await deleteDoc(doc(firestore, "dishes", dish.dishId));
      console.log(dish);
      await getDishes();
      reset();
    } catch (error) {
      setLoading(false);
    }
  }
  const onDishAddPress = () => {
    navigation.navigate("AddDish");
  };
  return (
    <View>
      <Header
        headingText={"Dishes"}
        showBackBtn={false}
        rightBtnText={"Add Dishes"}
        onRightBtnPress={onDishAddPress}
      />
      <FlatList
        data={dishes}
        ListEmptyComponent={<NoDishesFound />}
        style={{ marginBottom: 200 }}
        refreshing={refresh}
        onRefresh={() => {
          getDishes();
          setRefresh(true);
        }}
        renderItem={({ item }) => (
          <ListItem.Swipeable
            bottomDivider
            leftContent={null}
            rightContent={(reset) => (
              <Button
                title={"Delete"}
                onPress={() => onDishDeletePress(reset, item)}
                icon={{ name: "close", colors: "white", type: "ionicon" }}
                buttonStyle={{
                  minHeight: "100%",
                  backgroundColor: colors.primary,
                }}
              />
            )}
          >
            <Avatar size={"large"} rounded source={{ uri: item.data.imgUrl }} />
            <ListItem.Content>
              <ListItem.Title>{item.data.dishName}</ListItem.Title>
              <ListItem.Subtitle>{item.data.dishDescription}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Swipeable>
        )}
      />
      <Spinner visible={loading} />
    </View>
  );
}
function NoDishesFound() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No Dishes found 😢</Text>
    </View>
  );
}
