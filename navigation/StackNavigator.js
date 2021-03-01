import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';
import Home from '../src/screens/Home';
import CreatePost from '../src/screens/CreatePost';
import CreateReview from '../src/screens/CreateReview.js';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreatePost'
          component={CreatePost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreateReview'
          component={CreateReview}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
