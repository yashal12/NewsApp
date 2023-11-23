import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import {
  Button,
  TextInput,
  Switch,
  List,
  IconButton,
  Accordion,
} from "react-native-paper";
// import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function AccountScreen() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
    // You can implement the logic to toggle dark mode here
  };

  const openFeedbackForm = () => {
    // For now, it will open a dummy URL
    Linking.openURL("https://example.com/feedback-form");
  };

  const sections = [
    {
      title: "Feedback Form",
      content: [{ title: "Provide Feedback", onPress: openFeedbackForm }],
    },
    {
      title: "Permissions",
      content: [
        {
          title: "Privacy Policy",
          onPress: () => console.log("Privacy Policy pressed"),
        },
        {
          title: "Terms & Conditions",
          onPress: () => console.log("Terms & Conditions pressed"),
        },
      ],
    },
    {
      title: "Account",
      content: [
        {
          title: "Open Profile",
          onPress: () => console.log("Open Profile pressed"),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Account</Text>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>JohnDoe123</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>johndoe@example.com</Text>
      </View>

      <Button
        icon={() => <Icon name="lock" size={20} color="white" />}
        mode="contained"
        style={styles.button}
        onPress={() => console.log("Change Password pressed")}
      >
        Change Password
      </Button>

      <View style={styles.darkModeContainer}>
        <Text style={styles.darkModeLabel}>Dark Mode</Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={handleToggleDarkMode}
        />
      </View>

      {/* Accordion Sections */}
      <Accordion
        sections={sections}
        expandMultiple={false}
        underlayColor="transparent"
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    marginBottom: 20,
  },
  darkModeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  darkModeLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default AccountScreen;
