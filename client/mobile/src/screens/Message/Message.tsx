import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Message = () => (
  <StyledView>
    <Text>Message</Text>
  </StyledView>
);
