import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDish from "../Screens/addDish";
import Dishes from "../Screens/dishes";

const Stack = createNativeStackNavigator();

function DishNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dishes" component={Dishes} />
      <Stack.Screen name="AddDish" component={AddDish} />
    </Stack.Navigator>
  );
}

export { DishNavigator };
