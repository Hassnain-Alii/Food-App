import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/login";
import signup from "../Screens/signup";
import forgotPassword from "../Screens/forgotpassword";
import { HomeNavigator } from "./homeNavigator";
const Stack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={signup} />
        <Stack.Screen name="ForgotPassword" component={forgotPassword} />
        <Stack.Screen name="Tabs" component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
