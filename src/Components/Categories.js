import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// List of news categories
const categories = [
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

// object, Colors associated with each news category
const categoryColors = {
  Business: "#3498db",
  Entertainment: "#e74c3c",
  General: "#2ecc71",
  Health: "#9b59b6",
  Politics: "#f39c12",
  Science: "#16a085",
  Sports: "#e67e22",
  Technology: "#34495e",
  World: "#d35400",
};

// Categories component for displaying news categories
const Categories = ({ navigation }) => {
  return (
    // Horizontal ScrollView for displaying news categories
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        // TouchableOpacity for each category, navigating to GetNews screen on press
        <TouchableOpacity
          key={index}
          style={styles.categoryContainer}
          onPress={() => navigation.navigate("GetNews", { category })}
        >
          {/* View representing each category */}
          <View
            style={[
              styles.category,
              {
                backgroundColor: categoryColors[category],
                borderColor: categoryColors[category], // Set border color dynamically
              },
            ]}
          >
            {/* Text displaying the category name */}
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    margin: 10,
    marginBottom: width * 0.2,
  },
  category: {
    width: 150,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 8,
  },
  categoryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Categories;
