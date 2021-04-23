import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';
import Onboarding from '../src/screens/Onboarding';
import EditPost from '../src/screens/EditPost';
import ShowPosts from '../src/screens/ShowPosts';
import ReadPost from '../src/screens/ReadPost';
import EditUsername from '../src/screens/EditUsername';
import ForgotPassword from '../src/screens/ForgotPassword';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Onboarding'
          component={Onboarding}
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
          name='EditPost'
          component={EditPost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ShowPosts'
          component={ShowPosts}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='ReadPost' component={ReadPost} />
        <Stack.Screen
          name='EditUsername'
          component={EditUsername}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
