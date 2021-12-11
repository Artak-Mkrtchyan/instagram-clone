import React from 'react';
import { ScrollView } from 'react-native';
import { Loader } from 'src/components/Loader';
import { ProfileComponent } from 'src/components/Profile';
import {
    ProfileScreenRouteParamList, ProfileScreenStackProp
} from 'src/screens/BottomTabs/Profile/types';

import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ME } from './queries';

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenStackProp>();
  const route = useRoute<ProfileScreenRouteParamList>();

  const { loading, data } = useQuery(ME);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <ProfileComponent {...data.me} />}
    </ScrollView>
  );
};
