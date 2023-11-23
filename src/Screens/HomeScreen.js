import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  //   ActivityIndicator,
  StyleSheet,
} from "react-native";
import Categories from "../Components/Categories";
import Title from "../Components/Title";
import CurrentDate from "../Components/CurrentDate";
import TrendingNews from "../Components/TrendingNews";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

// const deviceHeight = Dimensions.get("window").height;
// const deviceWidth = Dimensions.get("window").width;

function HomeScreen({ navigation, route }) {
  const { category } = route.params || {}; // Use optional chaining to handle undefined route.params

  const [categoryNews, setCategoryNews] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(
        `https://gnews.io/api/v4/top-headlines?country=pk&category=world&apikey=17e3846c0655b3280c51ad059dcfcf4f`
      )
        // https://newsapi.org/v2/top-headlines?country=in&apiKey=49c6371866474509aef46cf574edc7e8
        .then((res) => res.json())
        .then((response) => {
          setCategoryNews(response.articles);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [category]);

  return (
    <View>
      <Title />
      <CurrentDate />
      <View style={styles.separator}></View>
      {/* <Categories navigation={navigation} /> */}
      <Text style={styles.title}>News Around The World!</Text>
      {/* <TrendingNews navigation={navigation} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: RFValue(20), // Use responsive font size
    color: "#16537e",
    marginBottom: width * 0.2,
    textAlign: "center", // Center the text within its container
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
