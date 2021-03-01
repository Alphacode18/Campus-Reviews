import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';
import Home from '../src/screens/Home';
import EditUsername from '../src/screens/EditUsername';

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
          name='EditUsername'
          component={EditUsername}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
