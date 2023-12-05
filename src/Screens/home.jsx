import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Header, Button, Input } from "../components";
import { SliderBox } from "react-native-image-slider-box";

export default function home({ navigation }) {
  const images = [
    "https://w0.peakpx.com/wallpaper/9/554/HD-wallpaper-food-chicken-delicious-food-holidays-indian-spices-spicy-food-street-food-swahabhaan-thumbnail.jpg",
    "https://w0.peakpx.com/wallpaper/271/323/HD-wallpaper-sandwich-food-lover-food-sandwich-thumbnail.jpg",
    "https://w0.peakpx.com/wallpaper/595/232/HD-wallpaper-mouthwatering-steak-delicious-food-thumbnail.jpg",
    "https://e0.pxfuel.com/wallpapers/158/282/desktop-wallpaper-biriyani-indian-food-recipes-vegetarian-full-meal-recipes-indian-food-recipes-mutton-biryani-thumbnail.jpg",
    "https://e0.pxfuel.com/wallpapers/913/317/desktop-wallpaper-typical-spanish-paella-meal-by-marti-sans-thumbnail.jpg",
    "https://e0.pxfuel.com/wallpapers/479/219/desktop-wallpaper-vegetarian-food-tips-meals-useful-lunch-cheap-vegetarian-recipes-meals-clean-eating-lifestyle-thumbnail.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/363/842/desktop-wallpaper-blur-bread-breakfast-cake-cuisine-delicious-dessert-dining-dinner-dish-epicure-food-food-graphy-food-preparation-fruits-homemade-meal-mouth-delicious-food-thumbnail.jpg",
  ];

  return (
    <View style={{ flex: 1 }}>
      <SliderBox style={styles.sliderBox} images={images} onPo />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderBox: {
    // flex: 1,
    height: "100%",
    width: "100%",
    // alignSelf: "center",
    // marginVertical: 10,
  },
  form: {
    padding: 10,
  },
});
