import * as React from 'react';
import { Animated, View, Dimensions } from 'react-native';
import _data from '../content/Onboarding';
const { width } = Dimensions.get('screen');

const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
      }}
    >
      {_data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              margin: 10,
              backgroundColor: '#fff',
              opacity: opacity,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

export default Indicator;
