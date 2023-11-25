import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const PrivacyPolicy = () => {
  const data = [
    "We may collect personal information, such as your name, email address, and other information you provide when you register or use the App.",
    "We may share your information with third-party service providers to assist us in providing and improving our services.",
    "We take reasonable measures to protect your information, but no method of transmission over the internet or electronic storage is 100% secure.",
    "You can modify or delete your personal information through the App's settings.",
    "You can also contact us for assistance.",
    "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
  ];

  const renderItem = ({ item, index }) => (
    <View style={styles.bulletPoint}>
      <Text style={styles.bulletPointText}>
        {`\u2022`} {item}
      </Text>
      {index === data.length - 1 && <View style={styles.separator} />}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={<Text style={styles.title}>Privacy Policy</Text>}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#16537e",
    textAlign: "center",
  },
  bulletPoint: {
    marginLeft: 20,
    marginBottom: 8,
  },
  bulletPointText: {
    fontSize: 16,
    lineHeight: 22,
    color: "black",
    marginBottom: 7,
  },
  separator: {
    height: 2,
    marginVertical: 14,
    backgroundColor: "#16537e",
    width: "50%",
    alignSelf: "center",
  },
});

export default PrivacyPolicy;
