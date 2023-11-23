import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const BookmarkScreen = () => {
  // State to manage bookmarks
  const [bookmarks, setBookmarks] = useState([
    { id: "1", title: "Breaking News 1", url: "https://www.reuters.com" },
    { id: "2", title: "Tech News", url: "https://technews.com" },
    { id: "3", title: "Sports Update", url: "https://sportsupdate.com" },
  ]);

  // Function to render each bookmark item
  const renderBookmarkItem = ({ item }) => (
    <View style={styles.bookmarkItem}>
      <TouchableOpacity style={styles.itemContainer}>
        {/* Container for text content */}
        <View style={styles.textContainer}>
          <Text>{item.title}</Text>
          <Text>{item.url}</Text>
        </View>

        {/* Vertical separator */}
        <View style={styles.separator} />

        {/* Bookmark icon */}
        <Icon name="bookmark" size={14} color="#16537e" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Bookmarks</Text>

      {/* Check if bookmarks are available */}
      {bookmarks.length > 0 ? (
        // Display bookmarks using FlatList
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookmarkItem}
        />
      ) : (
        // Display message if no bookmarks available
        <Text style={styles.emptyText}>No bookmarks available</Text>
      )}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    marginTop: width * 0.1,
    color: "#16537e",
    textAlign: "center",
  },
  bookmarkItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
});

export default BookmarkScreen;
