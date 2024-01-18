import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const GetNews = () => {
  const navigation = useNavigation();
  const category = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Politics",
    "Science",
    "Sports",
    "Technology",
    "World",
  ];
  const [categoryNews, setCategoryNews] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Fetch news data from the gnews API based on the specified category and page
    const fetchData = async () => {
      try {
        setIsLoadingMore(true);
        // console.log("Fetching data for category:", category);
        const response = await fetch(
          `https://gnews.io/api/v4/top-headlines?country=pk&category=${category}&apikey=17e3846c0655b3280c51ad059dcfcf4f`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // console.log("c", category);

        const data = await response.json();
        const titles = data.articles.map((article) => article.title);

        // console.log("titles", titles);
        // console.log("title", data.articles[0].title);

        // console.log("Received data from API:", data);
        setCategoryNews((prevNews) => [...prevNews, ...data.articles]);
      } catch (error) {
        console.error("Error GetNews:", error);
      }
    };

    fetchData();
  }, [category, page]);

  // Log the categoryNews state whenever it changes
  useEffect(() => {
    console.log("Category News from GetNews:", categoryNews);
  }, [categoryNews]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate("WebView", { url: item.url, title: item.title })
      }
    >
      <View style={styles.newsContainer} key={index}>
        <Image source={{ uri: `${item.image}` }} style={styles.newsImage} />
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleEndReached = () => {
    // Load more data when the end of the list is reached
    if (!isLoadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{category}</Text>
      <FlatList
        data={categoryNews}
        keyExtractor={(item, index) => `${item.title}_${index}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          // Show the loader at the bottom of the list while more data is being fetched
          isLoadingMore && (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.loader}
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  loader: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  newsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
    width: deviceWidth - 30,
    marginVertical: 7,
  },
  newsImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  newsContent: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
  },
  newsTitle: {
    width: "100%",
  },
});

export default GetNews;
