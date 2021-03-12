import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditPost from '../src/screens/EditPost';
import ShowPosts from '../src/screens/ShowPosts';
import ReadPost from '../src/screens/ReadPost';
import CreatePost from '../src/screens/CreatePost';
import Loading from '../src/screens/Loading';
import Buffer from '../src/screens/Buffer';
import NewBuffer from '../src/screens/NewBuffer';
import CreateReview from '../src/screens/CreateReview.js';
import EditReview from '../src/screens/EditReview.js';
import ShowReviews from '../src/screens/ShowReviews.js';
import ReadReview from '../src/screens/ReadReview.js';

const Stack = createStackNavigator();

function profNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Buffer'
        component={Buffer}
        initialParams={{ index: 3 }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Loading'
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ShowPosts'
        component={ShowPosts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CreatePost'
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='EditPost'
        component={EditPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ReadPost'
        component={ReadPost}
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
        <Stack.Screen
          name='NewBuffer'
          component={NewBuffer}
          initialParams={{ index: 0 }}
          options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default profNavigator;