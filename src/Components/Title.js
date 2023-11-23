import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

// Title component for displaying the app title, subtitle, and separator
function Title() {
  return (
    <View style={styles.titleContainer}>
      {/* App Title */}
      <Text style={styles.title}>Daily Dose</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Unveiling Stories That Shape Our Nation
      </Text>

      {/* Separator */}
      <View style={styles.separator}></View>
    </View>
  );
}

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
    // Platform-specific styling for iOS and Android
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
    // Platform-specific styling for iOS and Android
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

export default Title;
