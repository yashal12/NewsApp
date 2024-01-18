// import Onboarding from 'react-native-onboarding-swiper';
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  Animated,
  Text,
  SafeAreaView,
} from "react-native";
import Paginator from "../Components/Paginator";
import pages from "../Components/SlidesData";
import OnboardingItem from "../Components/OnboardingItem";
import NextButton from "../Components/NextButton";
// import Animated, { FadeIn } from "react-native-reanimated";

// Get the width of the device window
const windowWidth = Dimensions.get("window").width;

// OnboardingScreen component for displaying onboarding slides
function OnboardingScreen({ navigation }) {
  // State to track the current index of the active slide
  const [currentIndex, setCurrentIndex] = useState(0);
  // Animated value to track the scroll position
  const scrollX = useRef(new Animated.Value(0)).current;
  // Ref for the FlatList component to enable programmatic control
  const slidesRef = useRef(null);

  // Callback for viewable items change event
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  // Configuration for determining which items are considered viewable
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Function to scroll to the next slide
  const scrollTo = () => {
    if (currentIndex < pages.length - 1) {
      console.log("hi");
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Last item");
    }
  };

  // Function to skip to the home screen
  const skipToHome = () => {
    navigation.navigate("StartScreen"); // Replace 'Home' with the actual name of your home screen
  };

  return (
    <View style={styles.container}>
      {/* Title of the onboarding screen */}
      <Text style={styles.title}>Daily Dose</Text>

      {/* <Animated.ScrollView entering={FadeIn.duration(500)}
       <Text style={styles.title}>Daily Dose</Text>
       <Animated.ScrollView/> */}

      {/* Container for the FlatList of onboarding slides */}
      <View style={{ flex: 3 }}>
        <FlatList
          data={pages} // Array of data to be rendered
          renderItem={({ item }) => <OnboardingItem item={item} />} // Render item component for each data item
          horizontal // Scroll horizontally
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicators
          pagingEnabled // Enable paging, making it snap to items
          bounces={false} // Disable bouncing when reaching the end of the list
          keyExtractor={(item) => item.id} // Function to extract a unique key for each item
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )} // Event handler for scroll, updating 'scrollX' value
          scrollEventThrottle={32} // Throttle rate for the onScroll event (in milliseconds)
          onViewableItemsChanged={viewableItemsChanged} // Callback when viewable items change
          viewabilityConfig={viewConfig} // Configuration for determining which items are considered viewable
          ref={slidesRef} // Reference to the FlatList for programmatic control
        />
      </View>

      {/* Paginator component to display pagination dots */}
      <Paginator data={pages} scrollX={scrollX} />

      {/* NextButton component for navigation control */}
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / pages.length)}
        skipButton={skipToHome}
      />
    </View>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "800",
    fontSize: 40,
    color: "#16537e",
    // marginLeft: -100,
    marginTop: 55,
  },
});
