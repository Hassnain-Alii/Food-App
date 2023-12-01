import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/theme";
import Home from "../Screens/home.jsx";
import Profile from "../Screens/profile.jsx";
import { DishNavigator } from "./dishNaivator.js";

const Tab = createBottomTabNavigator();
const iconsNamesOutlined = {
  Home: "home-outline",
  Raws: "cart-outline",
  Dishes: "basket-outline",
  Sales: "heart-outline",
  Profile: "person-outline",
};

const iconsNamesFilled = {
  Home: "home",
  Raws: "cart",
  Dishes: "basket",
  Sales: "heart",
  Profile: "person",
};
function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let size = 22;
          let icon = "home";
          if (focused === true) {
            size = 33;
            icon = iconsNamesFilled[route.name];
          } else {
            icon = iconsNamesOutlined[route.name];
          }
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#DB3022",

        tabBarInativeTintColor: "#2A3541",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Raws" component={Home} /> */}
      <Tab.Screen name="DishStack" name={"Dishes"} component={DishNavigator} />
      {/* <Tab.Screen name="Sales" component={Home} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export { HomeNavigator };
