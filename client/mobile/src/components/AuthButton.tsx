import React from 'react';
import { ActivityIndicator } from 'react-native';
import { constants } from 'src/constants/constants';
import styled from 'styled-components/native';

interface ContainerProps {
  readonly bgColor?: string;
}

const Touchable = styled.TouchableOpacity``;
const Container = styled.View<ContainerProps>`
  background-color: ${(props) => (props.bgColor ? props.bgColor : props.theme.colors.blueColor)};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 2}px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

export const AuthButton = ({
  text,
  onPress,
  bgColor,
  loading = false,
}: {
  text: string;
  onPress: () => void;
  bgColor?: string;
  loading?: boolean;
}) => {
  return (
    <Touchable disabled={loading} onPress={() => onPress()}>
      <Container bgColor={bgColor}>
        {loading ? <ActivityIndicator color={'white'} /> : <Text>{text}</Text>}
      </Container>
    </Touchable>
  );
};
