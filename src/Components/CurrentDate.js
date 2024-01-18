import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

// CurrentDate component for displaying the formatted current date
function CurrentDate() {
  // Get the current date
  const currentDate = new Date();

  // Format the current date as a string
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    // Container for the current date
    <View style={styles.container}>
      {/* Separator line */}
      <View style={styles.separator}></View>
      {/* Text displaying the formatted current date */}
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  date: {
    fontSize: RFValue(12),
    color: "white",
    marginTop: 5,
    // backgroundColor: "#f4338f",
    backgroundColor: "black",

    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 10,
  },
  separator: {
    width: 45,
    height: "40%",
    borderBottomWidth: 1,
    borderBottomColor: "#16537e",
  },
});

export default CurrentDate;
