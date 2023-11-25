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
import FeedbackForm from "./src/Components/FeedbackForm";
// import HomeScreen from "./src/Screens/HomeScreen";

// Create a Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator for different screens */}
      <Stack.Navigator>
        {/* Onboarding Screen */}
        {/* <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        /> */}
        {/* Start Screen */}
        {/* <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        /> */}
        {/* SignUp Screen */}
        {/* <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        /> */}

        {/* Login Screen */}
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> */}
        {/* Home Screen with Bottom Tab Navigator */}

        {/* <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        /> */}
        {/* GetNews Screen */}

        {/* <Stack.Screen
          name="GetNews"
          component={GetNews}
          options={{ headerShown: false }}
        /> */}
        {/* WebView Screen */}

        {/* <Stack.Screen
          name="WebView"
          component={WebViewComponent}
          options={{ headerShown: false }}
        /> */}

        {/* Bookmark Screen */}

        {/* <Stack.Screen
          name="BookmarkScreen"
          component={BookmarkScreen}
          options={{ headerShown: false }}
        /> */}
        {/* Account Screen */}
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        {/* FeedbackForm */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
