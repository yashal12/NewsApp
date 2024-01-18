// WebViewComponent.js

import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const WebViewComponent = ({ route, navigation }) => {
  console.log("WebViewComponent start");

  console.log("route.params:", route.params);
  const { title, url } = route.params || {};

  const [loading, setLoading] = useState(true);

  // Add this function to navigate to BookmarkScreen
  const navigateToBookmarkScreen = () => {
    navigation.navigate("BookmarkScreen", {
      title: title,
      url: url,
    });
  };
  // const handleAddBookmark = async () => {
  //   try {
  //     await addBookmark(title, url);
  //     Alert.alert("Bookmark Added", "The page has been bookmarked!");
  //   } catch (error) {
  //     console.error("Error adding bookmark:", error);
  //     Alert.alert("Error", "Failed to add bookmark. Please try again.");
  //   }
  // };

  return (
    <>
      <Header
        centerComponent={{
          style: { color: "#fff", fontSize: 18 },
        }}
        rightComponent={
          // Add a button in the header to navigate to BookmarkScreen
          <TouchableOpacity onPress={navigateToBookmarkScreen}>
            <Icon name="bookmark-o" size={24} color="#fff" />
          </TouchableOpacity>
        }
        containerStyle={{ backgroundColor: "#148cdc" }}
      />
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: url }}
          onError={(error) => console.error("WebView Error:", error)}
          onLoad={() => setLoading(false)}
        />
        {loading && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <ActivityIndicator size="large" color="#16537e" />
          </View>
        )}
      </View>
    </>
  );
};

export default WebViewComponent;
