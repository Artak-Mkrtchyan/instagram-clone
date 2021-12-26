import React from 'react';
import { ScrollView } from 'react-native';
import { Loader } from 'src/components/Loader';
import { Post } from 'src/components/Post';

import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';

import { POST_DETAIL } from './queries';
import { DetailRouteParamList, DetailScreenProp } from './types';

export const DetailScreen = () => {
  const navigation = useNavigation<DetailScreenProp>();
  const route = useRoute<DetailRouteParamList>();
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: route.params.id },
  });

  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.seeFullPost && <Post {...data.seeFullPost} />}
    </ScrollView>
  );
};
