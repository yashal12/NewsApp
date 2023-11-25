import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";

const FeedbackForm = () => {
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
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        numberOfLines={2}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
        numberOfLines={2}
      />

      <Text style={styles.label}>Feedback:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.button} onPress={submitFeedback}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white", // Set the background color to white
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  textarea: {
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
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
});

export default FeedbackForm;
