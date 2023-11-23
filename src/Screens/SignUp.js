import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function SignUp({ navigation }) {
  // State variables for user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate to Login screen
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Placeholder action for sign up
  const handleSignUp = () => {
    navigation.navigate("Home");
  };

  // Placeholder action for signing up with Google
  const handleGoogleSignUp = async () => {
    Alert.alert("Sign Up with Google Placeholder Action");
  };

  return (
    <>
      {/* Background Image */}
      <ImageBackground
        source={require("./img/newsBg2.jpg")}
        style={styles.backgroundImage}
      ></ImageBackground>

      {/* Main Container */}
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={20}
            color="#16537e"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

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

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          {/* Google Sign-Up Button */}
          <TouchableOpacity
            style={styles.googleSignUpButton}
            onPress={handleGoogleSignUp}
          >
            <Image
              source={require("./img/google.png")}
              style={styles.gmailIcon}
            />
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Login Instead!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: 250,
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
    fontSize: width * 0.1,
    fontWeight: "900",
    marginBottom: width * 0.1,
    color: "#16537e",
    marginTop: -width * 0.22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: width * 0.1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: width * 0.007,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
  button: {
    backgroundColor: "#16537e",
    padding: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
    marginBottom: width * 0.07,
  },
  googleSignUpButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "40%",
    alignItems: "center",
  },
  gmailIcon: {
    width: width * 0.09,
    height: width * 0.09,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: width * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginLink: {
    color: "#16537e",
    fontWeight: "light",
    fontSize: width * 0.04,
  },
});

export default SignUp;
