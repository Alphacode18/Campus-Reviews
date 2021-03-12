import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditPost from '../src/screens/EditPost';
import ShowPosts from '../src/screens/ShowPosts';
import ReadPost from '../src/screens/ReadPost';
import CreatePost from '../src/screens/CreatePost';
import Loading from '../src/screens/Loading';
import Buffer from '../src/screens/Buffer';

const Stack = createStackNavigator();

function classNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Buffer'
        component={Buffer}
        initialParams={{ index: 1 }}
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
    </Stack.Navigator>
  );
}

export default classNavigator;