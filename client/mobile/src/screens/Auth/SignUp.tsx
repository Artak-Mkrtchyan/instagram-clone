import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import React, { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AuthButton } from 'src/components/AuthButton';
import { AuthInput } from 'src/components/AuthInput';
import { useInput } from 'src/hooks/useInput';
import { AuthNavigationParamList, AuthNavigationRoutes } from 'src/navigation/config';
import styled from 'styled-components/native';

import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.lightGreyColor};
  border-style: solid;
`;

export type SignUpStackProp = StackNavigationProp<
  AuthNavigationParamList,
  AuthNavigationRoutes.SIGNUP
>;

export const SignUp = () => {
  const navigation = useNavigation<SignUpStackProp>();
  const emailInput = useInput('');
  const usernameInput = useInput('');
  const firstNameInput = useInput('');
  const lastNameInput = useInput('');

  const [loading, setLoading] = useState<boolean>(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      username: usernameInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
    },
  });

  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const { value: username } = usernameInput;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert('That email is invalid');
    }
    if (username === '') {
      return Alert.alert('Invalid username');
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert('Account created', 'Log in now!');
        navigation.navigate(AuthNavigationRoutes.LOGIN, { email });
      }
    } catch (e) {
      Alert.alert('Username taken.', 'Log in instead');
      navigation.navigate(AuthNavigationRoutes.LOGIN, { email });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (email: string, firstName: string, lastName: string) => {
    emailInput.setValue(email);
    firstNameInput.setValue(firstName);
    lastNameInput.setValue(lastName);
    const [username] = email.split('@');
    usernameInput.setValue(username);
  };

  const googleLogin = async () => {
    const google_ios_client_id =
      '30782463120-8uk7usvqb1gbbt7p9u5pg8lo78qeqgvv.apps.googleusercontent.com';

    try {
      setLoading(true);
      const result = await Google.logInAsync({
        iosClientId: google_ios_client_id,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        const { email, family_name, given_name } = await userInfoResponse.json();

        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync({
        appId: '1486713441721691',
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`,
        );
        const { email, first_name, last_name } = await response.json();
        updateFormData(email, first_name, last_name);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <AuthInput
          {...emailInput}
          returnKeyType={'send'}
          keyboardType="email-address"
          placeholder="Email"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          returnKeyType={'send'}
          placeholder="Username"
          autoCorrect={false}
          autoCapitalize="words"
        />
        <AuthInput
          {...firstNameInput}
          returnKeyType={'send'}
          placeholder="First Name"
          autoCorrect={false}
          autoCapitalize="words"
        />
        <AuthInput
          {...lastNameInput}
          returnKeyType={'send'}
          placeholder="Last Name"
          autoCorrect={false}
          autoCapitalize="words"
        />
        <AuthButton loading={loading} text="Sign Up" onPress={handleSignUp} />
        <FBContainer>
          <AuthButton
            bgColor={'#2D4DA7'}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
          <AuthButton
            bgColor={'#EE1922'}
            loading={false}
            onPress={googleLogin}
            text="Connect Google"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
