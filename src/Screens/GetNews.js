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

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const GetNews = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params || {};
  const [categoryNews, setCategoryNews] = useState([]);

  useEffect(() => {
    fetch(
      `https://gnews.io/api/v4/top-headlines?country=pk&category=${category}&apikey=17e3846c0655b3280c51ad059dcfcf4f`
    )
      // https://newsapi.org/v2/everything?q=${category}&apiKey=49c6371866474509aef46cf574edc7e8
      .then((res) => res.json())
      .then((response) => {
        setCategoryNews(response.articles);
      })
      .catch((error) => console.error("Error:", error));
  }, [category]);

  return (
    <View style={{ alignItems: "center" }}>
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
          {categoryNews.map((news, index) =>
            // urlToImage
            news.image && news.image !== "" ? (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("WebView", { url: news.url })
                }
              >
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
                  <Image
                    source={{ uri: `${news.image}` }}
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                  />
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
