import * as React from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import _data from '../content/Onboarding';
import backgrounds from '../constants/Onboarding';
const { width } = Dimensions.get('screen');

const Backdrop = ({ scrollX }) => {
  const background = scrollX.interpolate({
    inputRange: backgrounds.map((_, i) => i * width),
    outputRange: backgrounds.map((background) => background),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: background,
        },
      ]}
    />
  );
};

export default Backdrop;
