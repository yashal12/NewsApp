import {
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleForgotPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent successfully.");
          showAlert("Password reset email sent successfully.", "");
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error.message);
          showAlert("Error sending password reset email.", "");
        });
    } else {
      console.error("Email is required for password reset.");
      showAlert("Email is required for password reset.", "");
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("user credential", userCredential);
        const user = userCredential.user;
        // console.log("user details", user);
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        // Display an alert for authentication errors
        showAlert("Invalid credentials!", "");
        return;
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView>
        <ImageBackground
          source={require("./img/newsBg2.jpg")}
          style={styles.backgroundImage}
        ></ImageBackground>
        <Text style={styles.title}>Login</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="envelope"
              size={20}
              color="#16537e"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={20}
              color="#16537e"
              style={styles.icon}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.SignUpContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.SignUpLink}>
                {/* Sign Up instead? */}
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    // flex: 1,
    // height: 300,
    // backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  title: {
    // fontSize: 29,
    // fontWeight: "900",
    // marginBottom: 50,
    // color: "#16537e",
    // marginTop: -155,
    fontSize: width * 0.1,
    fontWeight: "700",
    color: "#16537e",
    marginLeft: 120,
    marginTop: 50,
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
    textDecorationLine: "underline",
    marginLeft: 74,
  },
  forgotPasswordLink: {
    color: "red",
    fontSize: 13,
    marginRight: 16,
    textDecorationLine: "underline",
  },
  spacer: {
    width: 60,
  },
});
