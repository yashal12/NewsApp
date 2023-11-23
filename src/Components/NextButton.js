import React, { useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

function NextButton({ percentage, scrollTo, skipButton }) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage); //function
  }, [percentage]); //dependency array

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          //check if progressRef has been initialized
          progressRef.current.setNativeProps({ strokeDashoffset }); //set the strokeDashoffset property of the     progress circle to the calculated value
        }
      },
      [percentage]
    );
    return () => {
      //clear all listeners when the component unmounts
      progressAnimation.removeAllListeners();
    };
  }, []); //empty dependency array, so that it only runs when the component first mounts

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          {/* <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
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
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="rightcircleo" size={24} color="#fff" />
      </TouchableOpacity>

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

export default NextButton;

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
