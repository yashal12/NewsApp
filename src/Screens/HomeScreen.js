import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import Categories from "../Components/Categories";
import Title from "../Components/Title";
import CurrentDate from "../Components/CurrentDate";
import TrendingNews from "../Components/TrendingNews";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

// HomeScreen component
function HomeScreen({ navigation, route }) {
  // Extract category from route params using optional chaining
  const { category } = route.params || {};

  // State to manage category-specific news
  const [categoryNews, setCategoryNews] = useState([]);

  // Fetch category-specific news when category changes
  useEffect(() => {
    if (category) {
      fetch(
        `https://gnews.io/api/v4/top-headlines?country=pk&category=world&apikey=17e3846c0655b3280c51ad059dcfcf4f`
      )
        .then((res) => res.json())
        .then((response) => {
          setCategoryNews(response.articles);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [category]);

  return (
    <ScrollView style={styles.container}>
      {/* Title Component */}
      <Title />

      {/* CurrentDate Component */}
      <CurrentDate />

      {/* Separator Line */}
      {/* <View style={styles.separator}></View> */}
      <View style={{ marginBottom: 37 }} />
      {/* Title for News Section */}
      <Text style={styles.Categorytitle}>Categories</Text>

      {/* Categories Component  */}
      <Categories navigation={navigation} />

      {/* Title for News Section */}
      <Text style={styles.title}>News Around The World!</Text>
      <View style={styles.separator}></View>

      {/* TrendingNews Component  */}
      <TrendingNews navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Categorytitle: {
    fontWeight: "700",
    fontSize: RFValue(20), // Use responsive font size
    color: "#16537e",
    marginBottom: width * 0.1,
    textAlign: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: RFValue(20), // Use responsive font size
    color: "#16537e",
    // marginBottom: width * 0.2,
    textAlign: "center",
  },
  separator: {
    height: 1,
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#bcbcbc",

    width: "90%",
    alignSelf: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        // elevation: 2,
      },
    }),
  },
});

export default HomeScreen;
