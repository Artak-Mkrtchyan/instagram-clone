import React from 'react';
import { ScrollView } from 'react-native';
import { Loader } from 'src/components/Loader';
import { ProfileComponent } from 'src/components/Profile';
import { USER_FRAGMENT } from 'src/fragments/user';
import { CommonNavigationRoutes, CommonStackParamList } from 'src/navigation/config';

import { gql, useQuery } from '@apollo/client';
import { RouteProp, useRoute } from '@react-navigation/native';

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export type UserDetailRouteParamList = RouteProp<
  CommonStackParamList,
  CommonNavigationRoutes.USER_DETAIL
>;

export const UserDetail = () => {
  const route = useRoute<UserDetailRouteParamList>();

  const { loading, data } = useQuery(GET_USER, {
    variables: { username: route.params.username },
  });
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.seeUser && <ProfileComponent {...data.seeUser} />}
    </ScrollView>
  );
};
