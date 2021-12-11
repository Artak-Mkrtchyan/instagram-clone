import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image } from 'react-native';
import { constants } from 'src/constants/constants';
import { useInput } from 'src/hooks/useInput';
import {
    MainNavigationRoutes, PhotoParamList, UploadPhotoNavigationRoutes
} from 'src/navigation/config';
import { FEED_QUERY } from 'src/screens/BottomTabs/Home';
import { colors } from 'src/styles';
import styled from 'styled-components/native';

import { gql, useMutation } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${colors.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export type PhotoStackProp = StackNavigationProp<
  PhotoParamList,
  UploadPhotoNavigationRoutes.UPLOAD_PHOTO
>;

export type UploadPhotoScreenRouteParamList = RouteProp<
  PhotoParamList,
  UploadPhotoNavigationRoutes.UPLOAD_PHOTO
>;

export const UploadPhoto = () => {
  const [loading, setIsLoading] = useState(false);
  const captionInput = useInput('');
  const locationInput = useInput('');
  const navigation = useNavigation<PhotoStackProp>();
  const route = useRoute<UploadPhotoScreenRouteParamList>();
  const photo = route.params.photo;

  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });

  const handleSubmit = async () => {
    if (captionInput.value === '' || locationInput.value === '') {
      Alert.alert('All fields are required');
    }
    try {
      const formData = new FormData();

      formData.append('file', {
        name: photo.fileName,
        type: 'image/jpeg',
        uri: photo.uri,
      });

      setIsLoading(true);
      const {
        data: { location },
      } = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });
      if (upload.id) {
        navigation.navigate(MainNavigationRoutes.BOTTOM_TABS);
      }
    } catch (e) {
      console.log('error', e);
      Alert.alert('Cant upload', 'Try later');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image source={{ uri: photo.uri }} style={{ height: 80, width: 80, marginRight: 30 }} />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={colors.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={colors.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? <ActivityIndicator color="white" /> : <Text>Upload </Text>}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
