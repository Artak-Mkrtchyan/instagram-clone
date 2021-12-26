import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Layout } from 'src/constants/Layout';
import styled from 'styled-components/native';

import { colors } from '../styles';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${Layout.window.height / 2}px;
`;

export const Loader = () => {
  return (
    <Container>
      <ActivityIndicator color={colors.darkGreyColor} />
    </Container>
  );
};
