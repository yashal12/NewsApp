import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./src/Components/BottomTabNavigator";
import StartScreen from "./src/Screens/StartScreen";
import OnboardingScreen from "./src/Screens/OnboardingScreen";
import GetNews from "./src/Screens/GetNews";
import WebViewComponent from "./src/Components/WebView";
import BookmarkScreen from "./src/Screens/BookmarkScreen";
import AccountScreen from "./src/Screens/AccountScreen";
import SignUp from "./src/Screens/SignUp";
import Login from "./src/Screens/Login";
import HomeScreen from "./src/Screens/HomeScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetNews"
          component={GetNews}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookmarkScreen"
          component={BookmarkScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
