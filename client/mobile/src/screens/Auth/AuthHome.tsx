import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AuthButton } from 'src/components/AuthButton';
import { constants } from 'src/constants/constants';
import { AuthNavigationParamList, AuthNavigationRoutes } from 'src/navigation/config';
import styled from 'styled-components/native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5}px;
  margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${(props) => props.theme.colors.blueColor};
  margin-top: 20px;
`;

export type AuthHomeStackProp = StackNavigationProp<
  AuthNavigationParamList,
  AuthNavigationRoutes.HOME
>;

export type AuthHomeScreenRouteParamList = RouteProp<
  AuthNavigationParamList,
  AuthNavigationRoutes.HOME
>;

export const AuthHome = () => {
  const navigation = useNavigation<AuthHomeStackProp>();
  const route = useRoute<AuthHomeScreenRouteParamList>();

  return (
    <View>
      <Image resizeMode="contain" source={require('../../assets/logo.png')} />
      <AuthButton
        text="Create New Account"
        onPress={() => navigation.navigate(AuthNavigationRoutes.SIGNUP, {})}
      />
      <Touchable onPress={() => navigation.navigate(AuthNavigationRoutes.LOGIN, {})}>
        <LoginLink>
          <LoginLinkText>Login</LoginLinkText>
        </LoginLink>
      </Touchable>
    </View>
  );
};
