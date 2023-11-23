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
} from "react-native";
import Paginator from "../Components/Paginator";
import pages from "../Components/SlidesData";
import OnboardingItem from "../Components/OnboardingItem";
import NextButton from "../Components/NextButton";

const windowWidth = Dimensions.get("window").width;

function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    //make sure button can move the slides forward
    if (currentIndex < pages.length - 1) {
      // are there any slides left to go?
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Last item");
    }
  };

  const skipToHome = () => {
    navigation.navigate("StartScreen"); // Replace 'Home' with the actual name of your home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Dose</Text>

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
      <Paginator data={pages} scrollX={scrollX} />
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
    marginLeft: -100,
    marginTop: 55,
  },
});
