import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

// Component for rendering a WebView with a specified URL
const WebViewComponent = ({ route }) => {
  // Extracting the URL from the route parameters
  const { url } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {/* WebView component to display the web content */}
      <WebView
        source={{ uri: url }} // Setting the source URL for the WebView
        onError={(error) => console.error("WebView Error:", error)} // Handling WebView errors
      />
    </View>
  );
};

export default WebViewComponent;
