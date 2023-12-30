import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../Screens/HomeScreen";
import BookmarkScreen from "../Screens/BookmarkScreen";
import SettingScreen from "../Screens/SettingScreen";

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// BottomTabNavigator component
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#16537e",
        inactiveTintColor: "gray",
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Bookmark Tab */}
      <Tab.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Account Tab */}
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
