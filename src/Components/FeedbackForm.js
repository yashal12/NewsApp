import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FeedbackForm = () => {
  const animation = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    if (!name || !email || !feedback) {
      Alert.alert("Empty fields are not acceptable!");
    } else {
      Alert.alert("Thank You for your feedback!");
      // Linking.openURL("mailto: yashalimran01@gmail.com");
      // Reset the text inputs after submission
      setName("");
      setEmail("");
      setFeedback("");
    }
  };

  return (
    <>
      <View
        style={{
          // backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          padding: 96,
          // marginBottom: 5,
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          loop
          source={require("./img/feedback.json")}
          // style={{ marginTop: 10 }}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={20}
            color="#16537e"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
            numberOfLines={2}
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
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            numberOfLines={2}
          />
        </View>
        {/* <Text style={styles.label}>Feedback:</Text> */}
        <View style={styles.inputContainer}>
          <FontAwesome
            name="comment"
            size={20}
            color="#16537e"
            style={styles.icon}
          />
          <TextInput
            style={styles.textarea}
            placeholder="Enter your feedback"
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
            multiline
            numberOfLines={6}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={submitFeedback}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    // flex: 1,
    // padding: 30,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    // borderColor: "gray",
    // borderWidth: 1,
    // marginBottom: 25,
    padding: 8,
    // height: 40,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: width * 0.007,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
  icon: {
    marginRight: 10,
  },
  textarea: {
    height: 80,
    // borderColor: "gray",
    // borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    // marginBottom: width * 0.007,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
  button: {
    backgroundColor: "#16537e",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: width * 0.1,
  },
});

export default FeedbackForm;
