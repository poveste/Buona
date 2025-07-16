import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import PrecedentListScreen from '../screens/PrecedentListScreen';
import MonthScreen from '../screens/MonthScreen';
import MyPageScreen from '../screens/MyPageScreen';

const Tab = createBottomTabNavigator();
const screenHeight = Dimensions.get('window').height;
const tabBarHeight = screenHeight * 0.1;
const iconSize = tabBarHeight * 0.36;
const fontSize = tabBarHeight * 0.18;

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Precedents':
              iconName = 'document-text';
              break;
            case 'Month':
              iconName = 'calendar';
              break;
            case 'MyPage':
              iconName = 'person';
              break;
            default:
              iconName = 'ellipse';
          }

          return (
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              size={iconSize}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#7386BF',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#F2F2F2',
          height: tabBarHeight,
          borderTopColor: '#C9C9C9',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: fontSize,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="Precedents" component={PrecedentListScreen} options={{ title: '선행목록' }} />
      <Tab.Screen name="Month" component={MonthScreen} options={{ title: '월간선행' }} />
      <Tab.Screen name="MyPage" component={MyPageScreen} options={{ title: '내 정보' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
