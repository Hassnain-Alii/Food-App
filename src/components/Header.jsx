import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { ScreenStackHeaderSearchBarView } from "react-native-screens";
function Header({
  onBackBtnPress,
  headingText,
  showBackBtn = true,
  onRightBtnPress,
  rightBtnText,
  onChangeText,
  showLoading,
  showSearchBar = false,
  searchText,
  onClear,
}) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const onSearchBarPress = () => {
    setIsSearchBarOpen(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar color={"black"} translucent={true} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {showBackBtn === true && (
          <View style={{ justifyContent: "flex-start" }}>
            <TouchableOpacity onPress={onBackBtnPress}>
              <MaterialIcons name={"arrow-back"} size={35} color={"black"} />
            </TouchableOpacity>
          </View>
        )}
        {showSearchBar && !isSearchBarOpen && (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={onSearchBarPress}
          >
            <Ionicons name={"search"} size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {isSearchBarOpen ? (
        <View style={styles.searchBar}>
          <SearchBar
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              // display: isSearchBarOpen ? "flex" : "none",
            }}
            placeholder="Search..."
            onChangeText={onChangeText}
            lightTheme={true}
            showLoading={showLoading}
            round={true}
            rightIconContainerStyle={{ backgroundColor: "white" }}
            leftIconContainerStyle={{ backgroundColor: "white" }}
            containerStyle={{
              backgroundColor: "white",
              borderRadius: 15,
              width: "100%",
              paddingRight: 10,
            }}
            inputContainerStyle={{
              backgroundColor: "white",
              height: 35,
            }}
            value={searchText}
            onClear={onClear}
          />
          <TouchableOpacity
            style={{ alignSelf: "center", marginLeft: 10 }}
            onPress={() => setIsSearchBarOpen(false)}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", color: "red" }}>
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.textCon}>
          <Text style={styles.headingText}>{headingText}</Text>
          <TouchableOpacity
            style={styles.rightBtonCon}
            onPress={onRightBtnPress}
          >
            <Text style={styles.rightBtnText}>{rightBtnText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    paddingLeft: 10,
    marginTop: 40,
  },
  searchBar: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 20,
    height: 50,
    width: "80%",
    borderWidth: 1,
    left: 10,
  },
  textCon: {
    // marginTop: 40,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: 29,
    fontWeight: "500",
  },
  rightBtonCon: {
    margin: 5,
    marginRight: 10,
  },
  rightBtnText: {
    fontSize: 15,
    color: "red",
    fontWeight: "500",
  },
});
export { Header };
