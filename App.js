import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./src/Components/BottomTabNavigator";
import StartScreen from "./src/Screens/StartScreen";
import OnboardingScreen from "./src/Screens/OnboardingScreen";
import TrendingNews from "./src/Components/TrendingNews";
import ChangePassword from "./src/Components/ChangePassword";
import WebView from "./src/Components/WebView";
import BookmarkScreen from "./src/Screens/BookmarkScreen";
import SplashScreen from "./src/Screens/SplashScreen";
import Settings from "./src/Screens/SettingScreen";
import SignUp from "./src/Screens/SignUp";
import Login from "./src/Screens/Login";
import { LogBox } from "react-native";
import Categories from "./src/Components/Categories";
import EditProfile from "./src/Components/EditProfile";

// Create a Stack Navigator
const Stack = createStackNavigator();
// Ignore specific logs by providing an array of strings or regular expressions
LogBox.ignoreLogs(["Warning: ..."]);

// Ignore all logs that match the provided regular expression
LogBox.ignoreAllLogs();
function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator for different screens */}
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {/* Onboarding Screen */}
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        {/* Start Screen */}
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        {/* SignUp Screen */}
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        {/* Home Screen with Bottom Tab Navigator */}
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        {/* GetNews Screen */}
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrendingNews"
          component={TrendingNews}
          options={{ headerShown: false }}
        />
        {/* WebView Screen */}
        <Stack.Screen
          name="WebView"
          component={WebView}
          options={{ headerShown: false }}
        />
        {/* Bookmark Screen */}
        <Stack.Screen
          name="BookmarkScreen"
          component={BookmarkScreen}
          options={{ headerShown: false }}
        />
        {/* Account Screen */}
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
