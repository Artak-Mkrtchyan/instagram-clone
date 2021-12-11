import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import { Loader } from 'src/components/Loader';
import { constants } from 'src/constants/constants';
import {
    PhotoTabNavigationRoutes, UploadPhotoNavigationRoutes, UploadPhotoParamList
} from 'src/navigation/config';
import { colors } from 'src/styles';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const View = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${colors.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ButtonTwo = styled.TouchableOpacity`
  height: 40px;
  margin: 0 auto;
  padding: 0 10px;
  background-color: ${colors.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export type PhotoStackProp = StackNavigationProp<
  UploadPhotoParamList,
  PhotoTabNavigationRoutes.SELECT_PHOTO
>;

export const SelectPhoto = () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState<Asset>();
  const [allPhotos, setAllPhotos] = useState<Asset[]>();
  const navigation = useNavigation<PhotoStackProp>();

  const changeSelected = (photo) => {
    setSelected(photo);
  };

  const onButtonPress = useCallback(() => {
    launchImageLibrary({ selectionLimit: 10 }, ({ assets }) => {
      if (assets) {
        const [firstPhoto] = assets;
        setSelected(firstPhoto);
        setAllPhotos(assets);
      }
      setLoading(false);
    });
  }, []);

  const getPhotos = () => {
    try {
      setLoading(true);
      onButtonPress();
    } catch (e) {
      console.log(e);
    }
  };

  const askPermission = async () => {
    try {
      const status = await request(PERMISSIONS.IOS.CAMERA);
      if (status === 'granted') {
        setHasPermission(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  const handleSelected = () => {
    navigation.navigate(UploadPhotoNavigationRoutes.UPLOAD_PHOTO, { photo: selected });
  };

  useEffect(() => {
    void askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.height / 2 }}
                source={{ uri: selected?.uri }}
              />

              <Button onPress={handleSelected}>
                <Text>Select Photo</Text>
              </Button>

              {allPhotos ? (
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {allPhotos.map((photo) => (
                    <TouchableOpacity key={photo.fileName} onPress={() => changeSelected(photo)}>
                      <Image
                        source={{ uri: photo.uri }}
                        style={{
                          width: constants.width / 3,
                          height: constants.height / 6,
                          opacity: photo.fileName === selected?.fileName ? 0.5 : 1,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <ButtonTwo onPress={getPhotos}>
                  <Text>Select Photos from Gallery </Text>
                </ButtonTwo>
              )}
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};
