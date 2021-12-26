import React from 'react';
import { Message } from 'src/screens/Message/Message';
import { Messages } from 'src/screens/Message/Messages';

import { createStackNavigator } from '@react-navigation/stack';

import { MessageNavigationRoutes, MessagesPageParamList } from './config';

const StackNavigation = createStackNavigator<MessagesPageParamList>();

export const MessageNavigation = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigation.Screen name={MessageNavigationRoutes.MESSAGE} component={Message} />
      <StackNavigation.Screen name={MessageNavigationRoutes.MESSAGES} component={Messages} />
    </StackNavigation.Navigator>
  );
};
