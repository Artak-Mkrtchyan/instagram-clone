import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';



const StyledView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Notification = () => (
  <StyledView>
    <Text>Notification</Text>
  </StyledView>
);
