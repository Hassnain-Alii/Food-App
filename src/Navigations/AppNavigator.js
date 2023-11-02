import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login } from "../Screens/login";

const Stack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
