import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const BookmarkScreen = () => {
  const [bookmarks, setBookmarks] = useState([
    { id: "1", title: "Breaking News 1", url: "https://www.reuters.com" },
    { id: "2", title: "Tech News", url: "https://technews.com" },
    { id: "3", title: "Sports Update", url: "https://sportsupdate.com" },
  ]);

  const renderBookmarkItem = ({ item }) => (
    <View style={styles.bookmarkItem}>
      <TouchableOpacity>
        <Text>{item.title}</Text>
        <Text>{item.url}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarks</Text>
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookmarkItem}
        />
      ) : (
        <Text style={styles.emptyText}>No bookmarks available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: width * 0.1,
    color: "#16537e",
  },
  bookmarkItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default BookmarkScreen;
