import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

function Title() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Daily Dose</Text>
      <Text style={styles.subtitle}>
        Unveiling Stories That Shape Our Nation
      </Text>
      <View style={styles.separator}></View>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "left",
    marginBottom: 50,
    marginTop: 60,
    marginLeft: 9,
  },
  title: {
    fontWeight: "800",
    fontSize: RFValue(38), // Use responsive font size
    color: "#16537e",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  subtitle: {
    fontSize: RFValue(13), // Use responsive font size
    color: "#16537e",
  },
  separator: {
    height: 1,
    marginVertical: 10,
    borderTopWidth: 3,
    borderTopColor: "#16537e",
    width: "30%",
    alignSelf: "left",
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
        elevation: 2,
      },
    }),
  },
});
