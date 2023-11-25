import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const TermsConditions = () => {
  const data = [
    "By using this News App, you agree to be bound by the following Terms & Conditions. If you do not agree to these terms, please refrain from using the App.",
    "We provide news content for informational purposes only.",
    "You may use the App for personal, non-commercial purposes only. Reproduction, duplication, or distribution of the content for commercial purposes is strictly prohibited.",
    "We reserve the right to modify, suspend, or terminate the App or any part of its services at any time without prior notice.",
    "Your use of the App is at your sole risk. The App and its content are provided on an 'as is' and 'as available' basis.",
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
      ListHeaderComponent={<Text style={styles.title}>Terms & Conditions</Text>}
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

export default TermsConditions;
