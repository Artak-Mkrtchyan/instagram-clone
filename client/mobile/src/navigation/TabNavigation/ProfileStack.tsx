import React from 'react';
import { Platform } from 'react-native';
import { Logo } from 'src/components/Logo';
import { MessagesLink } from 'src/components/MessagesLink';
import { ProfileScreen } from 'src/screens/BottomTabs/Profile/Profile';
import { ProfileScreenStackProp } from 'src/screens/BottomTabs/Profile/types';

import { RouteProp, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomTabNavigationRoutes, BottomTabStackParamList, stackStyles } from '../config';

const StackNavigation = createStackNavigator();

export type ProfileStackRouteParamList = RouteProp<
  BottomTabStackParamList,
  BottomTabNavigationRoutes.PROFILE
>;

export const ProfileStackNavigator = () => {
  const route = useRoute<ProfileStackRouteParamList>();

  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen
        options={({ navigation }: { navigation: ProfileScreenStackProp }) => ({
          headerRight: () => <MessagesLink navigation={navigation} />,
          headerStyle: { backgroundColor: stackStyles.backgroundColor },
          headerTitle: () => <Logo />,
          headerTitleContainerStyle: {
            width: Platform.OS === 'ios' ? '60%' : '75%',
            alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
          },
        })}
        name="Profiletack"
        component={ProfileScreen}
      />
    </StackNavigation.Navigator>
  );
};
