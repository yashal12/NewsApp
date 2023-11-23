import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

function CurrentDate() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
  });

  return (
    <View style={styles.container}>
      <View style={styles.separator}></View>
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
    backgroundColor: "#f4338f",
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
