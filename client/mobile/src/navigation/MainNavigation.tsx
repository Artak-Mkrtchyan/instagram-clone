import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainNavigationRoutes, RootNavigationParamList } from './config';
import { MessageNavigation } from './MessageNavigation';
import { PhotoNavigation } from './PhotoNavigation';
import { TabNavigation } from './TabNavigation/TabNavigation';

const StackNavigation = createStackNavigator<RootNavigationParamList>();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
        }}
        initialRouteName={MainNavigationRoutes.BOTTOM_TABS}>
        <StackNavigation.Screen name={MainNavigationRoutes.BOTTOM_TABS} component={TabNavigation} />
        <StackNavigation.Screen name={MainNavigationRoutes.PHOTO} component={PhotoNavigation} />
        <StackNavigation.Screen
          name={MainNavigationRoutes.MESSAGES_PAGE}
          component={MessageNavigation}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
};
