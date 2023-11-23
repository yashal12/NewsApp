import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

// Paginator component for displaying pagination dots based on scroll position
function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        // Define input range for dot width and opacity animations
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        // Interpolate dot width based on scroll position
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
        });

        // Interpolate dot opacity based on scroll position
        const opacity = scrollX.interpolate({
          inputRange, //array of input values that correspond to the range of the animated value
          outputRange: [0.3, 1, 0.3], //array of output values that correspond to the inputRange
          extrapolate: "clamp", //determines how the output value should behave when the input value is outside the range defined by inputRange. "clamp" option ensures that the opacity remains within the specified range even if the scroll position goes beyond the defined input range.
        });

        return (
          // Animated View for each dot with dynamic width and opacity
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#493d8a",
    marginHorizontal: 8,
  },
});

export default Paginator;
