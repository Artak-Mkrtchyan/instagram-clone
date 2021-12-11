import React from 'react';
import { Platform } from 'react-native';
import { Logo } from 'src/components/Logo';
import { MessagesLink } from 'src/components/MessagesLink';
import { NavIcon } from 'src/components/NavIcon';
import { SearchStackNavigator } from 'src/navigation/Search/SearchStack';
import { HomeStackNavigator } from 'src/navigation/TabNavigation/HomeStack';
import { NotificationStackNavigator } from 'src/navigation/TabNavigation/NotificationStack';
import { ProfileStackNavigator } from 'src/navigation/TabNavigation/ProfileStack';
import { Add } from 'src/screens/BottomTabs/Add';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useRoute } from '@react-navigation/native';

import {
    BottomTabNavigationRoutes, BottomTabsParamList, MainNavigationRoutes, RootNavigationParamList,
    stackStyles
} from '../config';

const BottomTabNavigator = createBottomTabNavigator<BottomTabsParamList>();

export type TabScreenRouteParamList = RouteProp<
  RootNavigationParamList,
  MainNavigationRoutes.BOTTOM_TABS
>;

export const TabNavigation = () => {
  const route = useRoute<TabScreenRouteParamList>();

  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name={BottomTabNavigationRoutes.HOME}
        options={{
          tabBarStyle: {
            backgroundColor: '#FAFAFA',
          },
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
          ),
        }}
        component={HomeStackNavigator}
      />
      <BottomTabNavigator.Screen
        name={BottomTabNavigationRoutes.SEARCH}
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FAFAFA',
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => (
            <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
          ),
        }}
        component={SearchStackNavigator}
      />

      <BottomTabNavigator.Screen
        options={({ navigation }) => ({
          tabBarStyle: {
            backgroundColor: '#FAFAFA',
          },
          tabBarLabel: () => {
            return null;
          },
          headerTitle: () => <Logo />,
          headerRight: () => <MessagesLink navigation={navigation} />,
          headerStyle: { backgroundColor: stackStyles.backgroundColor },
          headerTitleContainerStyle: {
            width: Platform.OS === 'ios' ? '60%' : '75%',
            alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
          },
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              size={32}
              name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
            />
          ),
        })}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(MainNavigationRoutes.PHOTO);
          },
        })}
        name={BottomTabNavigationRoutes.ADD}
        component={Add}
      />
      <BottomTabNavigator.Screen
        name={BottomTabNavigationRoutes.NOTIFICATION}
        options={{
          tabBarStyle: {
            backgroundColor: '#FAFAFA',
          },
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
          ),
          headerTitleContainerStyle: {
            width: Platform.OS === 'ios' ? '60%' : '75%',
            alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
          },
        }}
        component={NotificationStackNavigator}
      />

      <BottomTabNavigator.Screen
        name={BottomTabNavigationRoutes.PROFILE}
        options={{
          tabBarStyle: {
            backgroundColor: '#FAFAFA',
          },
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
          ),
          headerTitleContainerStyle: {
            width: Platform.OS === 'ios' ? '60%' : '75%',
            alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
          },
        }}
        // initialParams={{ username: route.params}}
        component={ProfileStackNavigator}
      />
    </BottomTabNavigator.Navigator>
  );
};
