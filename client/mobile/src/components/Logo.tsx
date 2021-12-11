import React from 'react';
import { Image } from 'react-native';

export const Logo = () => (
  <Image style={{ height: 35 }} resizeMode="contain" source={require('../assets/logo.png')} />
);
