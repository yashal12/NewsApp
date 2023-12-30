import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen({ navigation }) {
  const animation = useRef(null);
  useEffect(() => {
    // Add any necessary logic or navigation here after the animation completes
    setTimeout(() => {
      // For example, navigate to the next screen
      navigation.replace("OnboardingScreen");
    }, 3000); // Adjust the timeout based on your animation duration
  }, [navigation]);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        loop
        source={require("./img/animated.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  //   buttonContainer: {
  //     paddingTop: 20,
  //   },
});
