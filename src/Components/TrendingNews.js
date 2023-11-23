import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function TrendingNews({ navigation }) {
  const [newsData, setNewsData] = useState([]);

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

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {newsData.map((news, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("WebView", { url: news.url })}
        >
          <View style={styles.newsContainer} key={index}>
            <View style={styles.greenBox} />
            <Image source={{ uri: `${news.image}` }} style={styles.image} />
            <View style={styles.overlay} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{news.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  newsContainer: {
    margin: 10,
    position: "relative",
  },
  greenBox: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 240, // Adjust the height as needed
    width: 220, // Adjust the width as needed (slightly wider than the image)
    backgroundColor: "#d0e0e3",
    borderRadius: 10,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 10,
    marginTop: 20, // Adjust the marginTop to leave space for the green box
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 10,
    width: 200,
  },
  title: {
    width: "100%",
    textAlign: "justify",
    backgroundColor: "#bcbcbc",
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    color: "black",
  },
});

export default TrendingNews;
