import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { constants } from 'src/constants/constants';
import { CommonNavigationRoutes } from 'src/navigation/config';

import { useNavigation } from '@react-navigation/native';

export const SquarePhoto = ({
  files = [],
  id,
}: {
  files: {
    id: string;
    url: string;
  }[];
  id: string;
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(CommonNavigationRoutes.DETAIL, { id })}>
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 6 }}
      />
    </TouchableOpacity>
  );
};
