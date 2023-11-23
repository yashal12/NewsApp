import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { List, TextInput, Button } from "react-native-paper";

const { width } = Dimensions.get("window");

// FeedbackForm component
const FeedbackForm = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  // Handle the submission of feedback
  const handleSubmit = () => {
    // Logic to submit feedback
    onSubmit(feedback);
    // Clear the feedback input after submission
    setFeedback("");
  };

  return (
    <View>
      {/* Text input for feedback */}
      <TextInput
        label="Feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline
        style={styles.feedbackInput}
      />
      {/* Button to submit feedback */}
      <Button mode="contained" onPress={handleSubmit}>
        Submit Feedback
      </Button>
    </View>
  );
};

function AccountScreen() {
  // Open a dummy URL for feedback form
  const openFeedbackForm = () => {
    Linking.openURL("https://example.com/feedback-form");
  };

  // Placeholder functions for opening Privacy Policy and Terms & Conditions
  const openPrivacyPolicy = () => {
    console.log("Privacy Policy pressed");
  };

  const openTermsAndConditions = () => {
    console.log("Terms & Conditions pressed");
  };

  // Placeholder function for handling "Open Profile" press
  const handleOpenProfilePress = () => {
    console.log("Open Profile pressed");
  };

  // Placeholder function for handling feedback submission
  const handleFeedbackSubmit = (feedback) => {
    console.log("Feedback submitted:", feedback);
  };

  // State variable to keep track of expanded sections in the accordion
  const [expandedSections, setExpandedSections] = useState([]);

  // Data for accordion sections
  const sections = [
    {
      title: "Provide Feedback",
      content: [
        { component: <FeedbackForm onSubmit={handleFeedbackSubmit} /> },
      ],
    },
    {
      title: "Account Details",
      content: [],
    },
    {
      title: "Open Profile",
      content: [
        {
          title: "Username",
          component: <Text style={styles.textContent}>JohnDoe123</Text>,
        },
        {
          title: "Email",
          component: (
            <Text style={styles.textContent}>johndoe@example.com</Text>
          ),
        },
        {
          title: "Change Password",
          component: (
            <Button
              mode="contained"
              onPress={() => console.log("Change Password pressed")}
              style={styles.button}
            >
              Change Password
            </Button>
          ),
        },
      ],
    },
    {
      title: "Permissions",
      content: [],
    },
    {
      title: "Privacy Policy",
      content: [
        {
          component: (
            <Text style={styles.textContent}>View Privacy Policy</Text>
          ),
        },
      ],
    },
    {
      title: "Terms & Conditions",
      content: [
        {
          component: (
            <Text style={styles.textContent}>Read Terms & Conditions</Text>
          ),
        },
      ],
    },
  ];

  // Function to handle accordion section press and toggle expansion
  const handleAccordionPress = (index) => {
    const newExpandedSections = [...expandedSections];
    newExpandedSections[index] = !newExpandedSections[index];
    setExpandedSections(newExpandedSections);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Account</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>We value your feedback!</Text>

      <View style={styles.section}>
        {sections
          //   .filter((section) => section.title === "Provide Feedback")
          .map((section, index) =>
            section.content.length === 0 ? (
              // Render list item for section without content
              <List.Item
                key={index}
                title={section.title}
                onPress={() => console.log(`${section.title} pressed`)}
              />
            ) : (
              // Render accordion for section with content
              <List.Accordion
                key={index}
                title={section.title}
                expanded={expandedSections[index]}
                onPress={() => handleAccordionPress(index)}
              >
                {section.content.map((item, itemIndex) => (
                  <View key={itemIndex}>{item.component}</View>
                ))}
                <View style={{ marginVertical: 10 }} />
              </List.Accordion>
            )
          )}
      </View>

      {/* Add margin between sections */}

      {/* Add margin between sections */}
      <View style={{ marginVertical: 10 }} />

      {/* Add margin between sections */}
      <View style={{ marginVertical: 10 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 30,
    marginTop: width * 0.1,
    textAlign: "center",
    color: "#16537e",
  },
  textContent: {
    marginLeft: width * 0.06,
    marginBottom: width * 0.06,
    marginTop: width * 0.06,
  },
  tagline: {
    fontSize: 16,
    color: "#16537e",
    marginBottom: width * 0.06,
    marginTop: width * 0.06,
  },
  section: {
    marginBottom: width * 0.06,
    marginVertical: 10,
  },

  feedbackInput: {
    marginBottom: width * 0.03,
    marginTop: width * 0.06,
  },
  button: {
    marginTop: width * 0.06,
  },
});

export default AccountScreen;
