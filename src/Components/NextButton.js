import React, { useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

// NextButton component for displaying a circular progress indicator and navigation buttons
function NextButton({ percentage, scrollTo, skipButton }) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current; // Animation value for tracking progress, initialized to 0
  const progressRef = useRef(null); // Reference to the Animated Circle component for dynamic updates

  // Function to define the animation for progress updates
  const animation = (toValue) => {
    // Use Animated.timing for a smooth transition
    return Animated.timing(progressAnimation, {
      toValue, // The target value for the animation
      duration: 250, // Duration of the animation in milliseconds
      useNativeDriver: true, // Use the native driver for performance
    }).start(); // Start the animation
  };

  // Effect to trigger the animation when the percentage changes
  useEffect(() => {
    // Call the animation function when the percentage changes
    animation(percentage);
  }, [percentage]);

  // Effect to update the progress circle during animation
  useEffect(() => {
    // Add a listener to the progressAnimation value to update the strokeDashoffset
    progressAnimation.addListener(
      (value) => {
        // Calculate the strokeDashoffset based on the current percentage
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        // Check if progressRef has been initialized
        if (progressRef?.current) {
          // Set the strokeDashoffset property of the progress circle
          progressRef.current.setNativeProps({ strokeDashoffset });
        }
      },
      [percentage] // Re-run the effect when the percentage changes
    );

    return () => {
      // Cleanup function to remove all listeners when the component unmounts
      progressAnimation.removeAllListeners();
    };
  }, []); // Empty dependency array, so it only runs when the component first mounts

  return (
    <View style={styles.container}>
      {/* SVG container with specified width and height */}
      <Svg width={size} height={size}>
        {/* Group element with rotation and origin properties */}
        <G rotation="-90" origin={center}>
          {/* <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          /> */}
          {/* <Circle
            ref={progressRef}
            stroke="#F4338F"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          /> */}
        </G>
      </Svg>
      {/* Button to navigate to the next screen */}
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="rightcircleo" size={24} color="#fff" />
      </TouchableOpacity>
      {/* Button to skip to another screen */}
      <TouchableOpacity
        onPress={skipButton}
        style={styles.button1}
        activeOpacity={0.6}
      >
        <AntDesign name="closecircleo" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 0.3,
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20,
    right: -80,
  },
  button1: {
    flex: 0.3,
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20,
    left: -80,
  },
});

export default NextButton;
