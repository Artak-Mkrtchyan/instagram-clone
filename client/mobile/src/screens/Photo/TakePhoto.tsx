import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CameraType, launchCamera } from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import { PhotoTabNavigationRoutes, UploadPhotoParamList } from 'src/navigation/config';
import { colors } from 'src/styles';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.View``;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 10px solid ${colors.lightGreyColor};
`;

export type PhotoStackProp = StackNavigationProp<
  UploadPhotoParamList,
  PhotoTabNavigationRoutes.TAKE_PHOTO
>;

export const TakePhoto = () => {
  const cameraRef = useRef();
  const navigation = useNavigation<PhotoStackProp>();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');

  const takePhoto = () => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      ({ assets }) => {},
    );
  };

  const askPermission = async () => {
    try {
      const status = await request(PERMISSIONS.IOS.CAMERA);
      if (status === 'granted') {
        setHasPermission(true);
        takePhoto();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = () => {
    if (cameraType === 'front') {
      setCameraType('back');
    } else {
      setCameraType('front');
    }
  };

  useEffect(() => {
    // askPermission();
  }, []);

  return (
    <View>
      {
        <>
          <View>
            <TouchableOpacity onPress={takePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      }
    </View>
  );
};
