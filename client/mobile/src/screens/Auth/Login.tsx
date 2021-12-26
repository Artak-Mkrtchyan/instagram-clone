import React, { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AuthButton } from 'src/components/AuthButton';
import { AuthInput } from 'src/components/AuthInput';
import { useInput } from 'src/hooks/useInput';
import { AuthNavigationParamList, AuthNavigationRoutes } from 'src/navigation/config';
import styled from 'styled-components/native';

import { useMutation } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { LOG_IN } from './AuthQueries';

const StyledView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export type LoginStackProp = StackNavigationProp<
  AuthNavigationParamList,
  AuthNavigationRoutes.LOGIN
>;

export type LoginScreenRouteParamList = RouteProp<
  AuthNavigationParamList,
  AuthNavigationRoutes.LOGIN
>;

export const Login = () => {
  const navigation = useNavigation<LoginStackProp>();
  const route = useRoute<LoginScreenRouteParamList>();
  const emailInput = useInput('');
  const [loading, setLoading] = useState<boolean>(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
    },
  });

  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (value === '') {
      return Alert.alert('Email can not be empty');
    } else if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Please write an email');
    } else if (!emailRegex.test(value)) {
      return Alert.alert('That email is invalid');
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert('Check your email');
        navigation.navigate(AuthNavigationRoutes.CONFIRM, { email: value });
      } else {
        Alert.alert('Account not found');
        navigation.navigate(AuthNavigationRoutes.SIGNUP, { email: value });
      }
    } catch (e) {
      console.warn(e);
      Alert.alert('Can not login now');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <AuthInput
          {...emailInput}
          returnKeyType={'send'}
          keyboardType="email-address"
          placeholder="Email"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text="Log In" onPress={handleLogin} />
      </StyledView>
    </TouchableWithoutFeedback>
  );
};
