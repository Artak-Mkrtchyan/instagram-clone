import React from 'react';
import {
    KeyboardTypeOptions, NativeSyntheticEvent, ReturnKeyTypeOptions, TextInputEndEditingEventData
} from 'react-native';
import { constants } from 'src/constants/constants';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2}px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.greyColor};
  border: 1px solid ${(props) => props.theme.colors.lightGreyColor};
  border-radius: 4px;
`;

export const AuthInput = ({
  placeholder,
  value,
  keyboardType = 'default',
  autoCapitalize = 'none',
  returnKeyType = 'none',
  onChange,
  autoCorrect = true,
  onSubmitEditing = () => null,
}: {
  placeholder: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: ReturnKeyTypeOptions;
  autoCorrect?: boolean;
  onChange: (text: string) => void;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
}) => {
  return (
    <Container>
      <TextInput
        onChangeText={onChange}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        value={value}
        autoCorrect={autoCorrect}
      />
    </Container>
  );
};
