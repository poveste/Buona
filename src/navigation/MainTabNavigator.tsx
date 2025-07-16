// src/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import PrecedentListScreen from '../screens/PrecedentListScreen';
import MonthScreen from '../screens/MonthScreen';
import MyPageScreen from '../screens/MyPageScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="Precedents" component={PrecedentListScreen} options={{ title: '선행목록' }} />
      <Tab.Screen name="Month" component={MonthScreen} options={{ title: '월간선행' }} />
      <Tab.Screen name="MyPage" component={MyPageScreen} options={{ title: '내 정보' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
