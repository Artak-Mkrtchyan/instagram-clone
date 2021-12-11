import React from 'react';
import { Platform } from 'react-native';
import { Logo } from 'src/components/Logo';
import { MessagesLink } from 'src/components/MessagesLink';
import { Notification } from 'src/screens/BottomTabs/Notification';

import { createStackNavigator } from '@react-navigation/stack';

import { stackStyles } from '../config';

const StackNavigation = createStackNavigator();

export const NotificationStackNavigator = () => {
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen
        options={({ navigation }) => ({
          headerRight: () => <MessagesLink navigation={navigation} />,
          headerStyle: { backgroundColor: stackStyles.backgroundColor },
          headerTitle: () => <Logo />,
          headerTitleContainerStyle: {
            width: Platform.OS === 'ios' ? '60%' : '75%',
            alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
          },
        })}
        name="NotificationStack"
        component={Notification}
      />
    </StackNavigation.Navigator>
  );
};
