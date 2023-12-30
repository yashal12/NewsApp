import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Components/firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setLoading(false);

      if (authUser) {
        // User is authenticated, navigate to the login page
        navigation.replace("Login");
      }
    });

    return unsubscribe;
  }, []);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const register = async () => {
    if (userName === "" || email === "" || password === "") {
      showAlert("Please enter your credentials!", "");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      await setDoc(doc(db, "users", `${myUserUid}`), {
        userName: userName,
        email: user,
      });

      // Reset form fields
      setUserName("");
      setEmail("");
      setPassword("");

      // Navigate to login screen after successful registration
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error:", error.message);
      showAlert("Registration Error", error.message);
    }
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
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="user"
              size={20}
              color="#16537e"
              style={styles.icon}
            />
            <TextInput
              placeholder="Username"
              value={userName}
              onChangeText={(text) => setUserName(text)}
              style={styles.input}
            />
          </View>
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
          <TouchableOpacity onPress={register} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  formContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    // fontSize: width * 0.1,
    // fontWeight: "900",
    // color: "#16537e",
    // marginTop: 200,
    fontSize: width * 0.1,
    fontWeight: "700",
    color: "#16537e",
    marginLeft: 120,
    marginTop: 50,
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
  buttonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  loginLink: {
    color: "#16537e",
    fontWeight: "light",
    fontSize: width * 0.04,
  },
});

export default SignUp;
