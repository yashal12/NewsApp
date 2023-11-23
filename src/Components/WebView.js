import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const WebViewComponent = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        onError={(error) => console.error("WebView Error:", error)}
      />
    </View>
  );
};

export default WebViewComponent;
