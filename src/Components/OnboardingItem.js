import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";

function OnboardingItem({ item }) {
  // Get the width of the window
  const { width } = useWindowDimensions();

  return (
    // style={styles.container}
    <View>
      {/* Display the image with dynamic width and resizeMode */}
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      {/* Container with 0.3 flex for title and description */}
      <View>
        {/* Display the title */}
        <Text style={styles.title}>{item.title}</Text>
        {/* Display the description */}
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    flexDirection: "row",
    width: "50%",
    marginTop: 90,
    marginRight: 180,
    height: 200,
  },
  title: {
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 10,
    color: "#16537e",
    textAlign: "center",
    marginTop: 70,
    marginLeft: -200,
  },
  description: {
    fontWeight: "300",
    paddingHorizontal: 64,
    color: "#62656b",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 120,
    marginLeft: -190,
  },
});
