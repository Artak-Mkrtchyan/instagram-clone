import React from 'react';
import { SelectPhoto } from 'src/screens/Photo/SelectPhoto';
import { TakePhoto } from 'src/screens/Photo/TakePhoto';
import { UploadPhoto } from 'src/screens/Photo/UploadPhoto';
import { colors } from 'src/styles';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
    PhotoParamList, PhotoTabNavigationRoutes, stackStyles, UploadPhotoNavigationRoutes
} from './config';

const MaterialTopTabNavigator = createMaterialTopTabNavigator();

const PhotoTab = () => {
  return (
    <MaterialTopTabNavigator.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: colors.blackColor,
        },
        tabBarStyle: {
          backgroundColor: stackStyles.backgroundColor,
        },
      }}
      tabBarPosition="bottom">
      <MaterialTopTabNavigator.Screen
        name={PhotoTabNavigationRoutes.SELECT_PHOTO}
        component={SelectPhoto}
      />
      <MaterialTopTabNavigator.Screen
        name={PhotoTabNavigationRoutes.TAKE_PHOTO}
        component={TakePhoto}
      />
    </MaterialTopTabNavigator.Navigator>
  );
};

const StackNavigation = createStackNavigator<PhotoParamList>();

export const PhotoNavigation = () => {
  return (
    <StackNavigation.Navigator
      initialRouteName={UploadPhotoNavigationRoutes.PHOTO_TAB}
      screenOptions={{ presentation: 'modal', headerShown: false }}>
      <StackNavigation.Screen name={UploadPhotoNavigationRoutes.PHOTO_TAB} component={PhotoTab} />
      <StackNavigation.Screen
        name={UploadPhotoNavigationRoutes.UPLOAD_PHOTO}
        component={UploadPhoto}
      />
    </StackNavigation.Navigator>
  );
};
