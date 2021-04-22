import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _data from './content/Onboarding';
import Indicator from './Onboarding/Indicator';
import Backdrop from './Onboarding/Backdrop';
import Square from './Onboarding/Square';
const { width, height } = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

export default function onboardingScreen({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={_data}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View style={{ flex: 0.8, justifyContent: 'center' }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 0.2 }} />
              <View style={{ flex: 0.2 }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                    fontSize: 28,
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: 'white', fontWeight: '300' }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View style={{ flexDirection: 'row', paddingBottom: 75 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    marginBottom: 50,
    marginHorizontal: 25,
  },
});
