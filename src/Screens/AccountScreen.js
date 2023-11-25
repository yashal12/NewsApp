import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { List, Button, TextInput } from "react-native-paper";
import Logout from "../Components/Logout";
import FeedbackForm from "../Components/FeedbackForm";
import PrivacyPolicy from "../Components/PrivacyPolicy";
import CustomModal from "../Components/CustomModal";
import TermsConditions from "../Components/TermsConditions";

const { width, height } = Dimensions.get("window");

function AccountScreen({ navigation }) {
  const handleLogout = () => {
    navigation.navigate("OnboardingScreen");
  };

  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [isPrivacyPolicyVisible, setIsPrivacyPolicyVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);

  const openFeedbackForm = () => {
    setIsFeedbackModalVisible(true);
  };

  const closeFeedbackForm = () => {
    setIsFeedbackModalVisible(false);
  };

  const openPrivacyPolicy = () => {
    setIsPrivacyPolicyVisible(true);
  };

  const closePrivacyPolicy = () => {
    setIsPrivacyPolicyVisible(false);
  };

  const openTerms = () => {
    setIsTermsVisible(true);
  };

  const closeTerms = () => {
    setIsTermsVisible(false);
  };

  const handleFeedbackSubmit = (feedback) => {
    console.log("Feedback submitted:", feedback);
    // Close the modal after submitting feedback
    closeFeedbackForm();
  };

  const [expandedSections, setExpandedSections] = useState([]);

  // Data for accordion sections
  const sections = [
    {
      title: "Provide Feedback",
      content: [
        {
          component: (
            <Button
              onPress={openFeedbackForm}
              labelStyle={styles.feedbackButtonLabel}
            >
              Provide Feedback
            </Button>
          ),
        },
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
        // {
        //   title: "Change Password",
        //   component: (
        //     <Button
        //       mode="contained"
        //       onPress={() => console.log("Change Password pressed")}
        //       style={styles.button}
        //     >
        //       Change Password
        //     </Button>
        //   ),
        // },
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
            <Text style={styles.textContent} onPress={openPrivacyPolicy}>
              View Privacy Policy
            </Text>
          ),
        },
      ],
    },
    {
      title: "Terms & Conditions",
      content: [
        {
          component: (
            <Text style={styles.textContent} onPress={openTerms}>
              View Terms & Conditions
            </Text>
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
      <Logout onPress={handleLogout} />

      {/* Tagline */}
      <Text style={styles.tagline}>We value your feedback!</Text>

      <View style={styles.section}>
        {sections.map((section, index) =>
          section.content.length === 0 ? (
            // Render list item for section without content
            <List.Item
              key={index}
              title={section.title}
              titleStyle={styles.sectionTitle}
              onPress={() => console.log(`${section.title} pressed`)}
            />
          ) : (
            // Render accordion for section with content
            <List.Accordion
              key={index}
              title={section.title}
              expanded={expandedSections[index]}
              titleStyle={styles.accordionTitle}
              onPress={() => handleAccordionPress(index)}
            >
              {section.content.map((item, itemIndex) => (
                <View key={itemIndex} style={{ alignItems: "center" }}>
                  {item.component}
                </View>
              ))}
              <View style={{ marginVertical: 10 }} />
            </List.Accordion>
          )
        )}
      </View>

      {/* FeedbackForm Modal */}
      <CustomModal
        isVisible={isFeedbackModalVisible}
        onClose={closeFeedbackForm}
        content={<FeedbackForm onSubmit={handleFeedbackSubmit} />}
      />

      {/* PrivacyPolicy Modal */}
      <CustomModal
        isVisible={isPrivacyPolicyVisible}
        onClose={closePrivacyPolicy}
        content={<PrivacyPolicy />}
      />
      {/* Terms & conditions Modal */}
      <CustomModal
        isVisible={isTermsVisible}
        onClose={closeTerms}
        content={<TermsConditions />}
      />
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
    color: "black",
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
    backgroundColor: "#f4338f",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16537e",
    marginVertical: 7,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "light",
    color: "#16537e",
  },
  feedbackButtonLabel: {
    color: "black",
  },
});

export default AccountScreen;
