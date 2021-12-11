import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Loader } from 'src/components/Loader';
import { Post } from 'src/components/Post';
import { POST_FRAGMENT } from 'src/fragments/post';

import { gql, useQuery } from '@apollo/client';

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFeed && data.seeFeed.map((post: any) => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
