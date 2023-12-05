import {
  View,
  FlatList,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { colors } from "../utils/theme";

import { ListItem, Avatar, Button, FAB } from "@rneui/themed";
import reactotron from "reactotron-react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Dishes({ navigation, route }) {
  const { newDish } = route.params || {};
  const [dishes, setDishes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDishType, setSelectedDishType] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  const sortDishes = () => {
    const sortedDishes = [...dishes];
    if (sortOrder === "lowToHigh") {
      sortedDishes.sort((a, b) => a.dishPrice - b.dishPrice);
      setSortOrder("highToLow");
    } else {
      sortedDishes.sort((a, b) => b.dishPrice - a.dishPrice);
      setSortOrder("lowToHigh");
    }
    setDishes(sortedDishes);
  };
  const handleSearch = (text) => {
    setSearchQuery(text);
    // Additional logic for filtering the data based on the search query
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.dishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    console.log("UseEffect triggered with newDish:", newDish);

    // If new dish data is received, update the state
    if (newDish) {
      setDishes((prevDishes) => [...prevDishes, newDish]);
    }
  }, [newDish]);

  const onDishAddPress = () => {
    navigation.navigate("AddDish");
  };
  const onBackBtnPress = () => {
    navigation.navigate("Home");
  };

  const onDishTypePress = (type) => {
    setSelectedDishType((prevType) => (prevType === type ? "" : type));
  };
  const onDishDeletePress = (index) => {
    const updatedIngData = [...ingData];
    updatedIngData.splice(index, 1);
    setIngData(updatedIngData);
  };

  return (
    <View>
      <View style={styles.upperCon}>
        <Header
          headingText={"Dishes"}
          showBackBtn={true}
          // rightBtnText={"Add Dishes"}
          // onRightBtnPress={onDishAddPress}
          showSearchBar={true}
          onBackBtnPress={onBackBtnPress}
          onChangeText={handleSearch}
          searchText={searchQuery}
        />

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
            backgroundColor: "rgba(222,226,230,0.9)",
            borderRadius: 30,
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}
          >
            <Ionicons name="filter" size={24} color="black" />
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}
            onPress={sortDishes}
          >
            <MaterialIcons name="swap-vert" size={24} color="black" />
            <Text style={{ marginLeft: 0 }}>
              {sortOrder === "lowToHigh"
                ? "Price: Low to high"
                : "Price: High to low"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="grip-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        // data={dishes}
        data={filteredDishes}
        ListEmptyComponent={<NoDishesFound />}
        style={{ marginBottom: 200, marginTop: 30 }}
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          setRefresh(false);
        }}
        renderItem={({ item }) => (
          <ListItem.Swipeable
            bottomDivider
            leftContent={null}
            // style={{ marginVertical: 5 }}
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
            <Avatar size={"large"} rounded source={{ uri: item.imgUrl }} />
            <ListItem.Content>
              <ListItem.Title>{item.dishName}</ListItem.Title>
              <ListItem.Subtitle>{item.dishDescription}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.dishPrice}$</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Swipeable>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={onDishAddPress}>
        <Ionicons style={styles.fabIcon} name="add" color={"white"} size={33} />
        <Text style={styles.fabText}>Add Dishes</Text>
      </TouchableOpacity>

      <Spinner visible={loading} />
    </View>
  );
}
function NoDishesFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 60,
      }}
    >
      <Text>No Dishes found 😢</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  upperCon: {
    // flex: 1,
    backgroundColor: "white",
  },
  chipsMe: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 10,
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
  fab: {
    position: "absolute",
    top: 720,
    flexDirection: "row",
    backgroundColor: "red",
    borderRadius: 30,
    padding: 10,
    left: 265,
  },
  fabText: {
    color: "white",
    fontWeight: "700",
    alignSelf: "center",
  },
});
