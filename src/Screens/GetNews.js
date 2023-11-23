import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Get the device dimensions
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

// GetNews component for displaying news based on a specified category
const GetNews = ({ route }) => {
  // Use the navigation hook from react-navigation
  const navigation = useNavigation();
  // Extract category from route parameters
  const { category } = route.params || {};
  // State to store news data for the specified category
  const [categoryNews, setCategoryNews] = useState([]);

  useEffect(() => {
    // Fetch news data from the gnews API based on the specified category
    fetch(
      `https://gnews.io/api/v4/top-headlines?country=pk&category=${category}&apikey=17e3846c0655b3280c51ad059dcfcf4f`
    )
      .then((res) => res.json())
      .then((response) => {
        // Update state with the fetched news data
        setCategoryNews(response.articles);
      })
      .catch((error) => console.error("Error:", error));
  }, [category]); // Re-run the effect when the category changes

  return (
    <View style={{ alignItems: "center" }}>
      {/* Display loading indicator while fetching data */}
      {categoryNews.length === 0 ? (
        <ActivityIndicator
          color="black"
          size="large"
          style={{
            height: deviceHeight,
            width: deviceWidth,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Map through the news data and display each news item */}
          {categoryNews.map((news, index) =>
            // Check if the news item has an image
            news.image && news.image !== "" ? (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("WebView", { url: news.url })
                }
              >
                {/* News item container */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 4,
                    width: deviceWidth - 30,
                    marginVertical: 7,
                  }}
                  key={index}
                >
                  {/* News image */}
                  <Image
                    source={{ uri: `${news.image}` }}
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                  />
                  {/* News content */}
                  <View style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
                    <Text style={{ width: "100%" }}>{news.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default GetNews;
