import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

// StartScreen component for the initial screen
function StartScreen({ navigation }) {
  // Navigate to the sign-up screen
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  // Navigate to the login screen
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Let's Get Started!</Text>
      {/* App Logo */}
      <Image source={require("./img/newsRead.png")} style={styles.image} />
      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.button1}>
        <Text style={styles.buttonText1}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 0.2,
    color: "#16537e",
    marginTop: -60,
    marginBottom: 20,
    fontWeight: "700",
    fontSize: 29,
  },
  image: {
    borderRadius: 30,
    width: "50%",
    height: 150,
    marginBottom: 40,
    marginTop: 90,
  },
  button: {
    backgroundColor: "#16537e",
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#fff",
    color: "#16537e",
    borderColor: "#16537e",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
  },
  buttonText1: {
    color: "#16537e",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#333",
  },
  loginLink: {
    color: "#16537e",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default StartScreen;
