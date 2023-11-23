import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Login({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("Home");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };
  const handleForgotPassword = async () => {
    Alert.alert("Forgot Password");
  };

  return (
    <>
      <ImageBackground
        source={require("./img/newsBg2.jpg")}
        style={styles.backgroundImage}
      ></ImageBackground>

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <FontAwesome
            name="envelope"
            size={20}
            color="#16537e"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome
            name="lock"
            size={20}
            color="#16537e"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.SignUpContainer}>
          {/* Forgot Password Link */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          {/* Sign UP Link */}
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.SignUpLink}>Sign Up Instead!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: 300,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 29,
    fontWeight: "900",
    marginBottom: 50,
    color: "#16537e", // Set text color to white
    marginTop: -155,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
  button: {
    backgroundColor: "#16537e",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  SignUpContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  SignUpLink: {
    color: "#16537e",
    fontWeight: "light",
    fontSize: 13,
    textDecorationLine: "underline", // Underline text decoration
  },
  forgotPasswordLink: {
    color: "#16537e",
    fontSize: 13,
    marginRight: 10,
    textDecorationLine: "underline", // Underline text decoration
  },
  spacer: {
    width: 60, // Add spacing between the links
  },
});

export default Login;
