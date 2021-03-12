import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';
import Home from '../src/screens/Home';
import CreatePost from '../src/screens/CreatePost';
import CreateReview from '../src/screens/CreateReview.js';
import EditReview from '../src/screens/EditReview.js';
import ShowReviews from '../src/screens/ShowReviews.js';
import ReadReview from '../src/screens/ReadReview.js';

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
        <Stack.Screen
          name='EditReview'
          component={EditReview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ShowReviews'
          component={ShowReviews}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ReadReview'
          component={ReadReview}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
