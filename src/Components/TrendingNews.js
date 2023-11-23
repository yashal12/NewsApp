import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// Component for displaying trending news
function TrendingNews({ navigation }) {
  // State to store news data
  const [newsData, setNewsData] = useState([]);

  // Fetching trending news data from the API
  useEffect(() => {
    fetch(
      `https://gnews.io/api/v4/top-headlines?country=pk&apikey=17e3846c0655b3280c51ad059dcfcf4f`
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.articles);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Render each news item
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate("WebView", { url: item.url })}
    >
      <View style={styles.newsContainer} key={index}>
        {/* Green Box for News Item */}
        <View style={styles.greenBox} />

        {/* Image for News Item */}
        <Image source={{ uri: `${item.image}` }} style={styles.image} />

        {/* Overlay for News Item */}
        <View style={styles.overlay} />

        {/* Title and Description Container */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.separator} />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={newsData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      vertical={true}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  newsContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  greenBox: {
    position: "absolute",
    height: 440,
    width: width * 0.9,
    backgroundColor: "#d0e0e3",
    borderRadius: 10,
  },
  image: {
    height: 300,
    width: width * 0.7,
    borderRadius: 10,
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
  },
  contentContainer: {
    position: "absolute",
    bottom: 70,
    padding: 10,
    width: width * 0.7,
    borderRadius: 10,
    backgroundColor: "#bcbcbc",
  },
  title: {
    textAlign: "center",
    padding: 5,
    color: "black",
  },
  separator: {
    height: 1,
    marginVertical: 5,
    borderTopWidth: 3,
    borderTopColor: "#16537e",
    alignSelf: "center", // Center the separator
    width: "30%",
  },
  description: {
    textAlign: "center",
    padding: 5,
    color: "black",
  },
});

export default TrendingNews;
