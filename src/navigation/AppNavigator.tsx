// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterPage from '../screens/registerpage';

import MainTabNavigator from './MainTabNavigator';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
        <Stack.Screen name="Register" component={RegisterPage} options={{ title: '회원가입' }} />
        
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
