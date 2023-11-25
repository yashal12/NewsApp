import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Logout({ onPress, navigation }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#16537e",
    padding: 3,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
    marginLeft: 220,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Logout;
