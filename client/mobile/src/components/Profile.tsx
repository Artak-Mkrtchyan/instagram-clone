import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Post } from 'src/components/Post';
import { SquarePhoto } from 'src/components/SquarePhoto';
import { constants } from 'src/constants/constants';
import { colors } from 'src/styles';
import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';
import { Platform } from '@unimodules/core';

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${colors.darkGreyColor};
`;

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;

const Bio = styled.Text``;

const ButtonContainer = styled.View`
  padding-vertical: 5px;
  border: 1px solid ${colors.lightGreyColor};
  flex-direction: row;
  margin-top: 30px;
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

const SquareContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export interface Post {
  id: string;
  user: {
    id: string;
    avatar: string;
    username: string;
  };
  files: {
    id: string;
    url: string;
  }[];
  likeCount: number;
  isLiked: boolean;
  comments: {
    id: string;
    text: string;
    user: {
      id: string;
      username: string;
    };
  }[];
  caption: string;
  location: string;
  createdAt: string;
}

export type Props = {
  id: string;
  avatar: string;
  username: string;
  fullName: string;
  isFollowing: boolean;
  isSelf: boolean;
  bio: string;
  followingCount: number;
  followersCount: number;
  postsCount: number;
  posts: Post[];
};

export const ProfileComponent = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  fullName,
  posts,
}: Props) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid((i) => !i);
  return (
    <View>
      <ProfileHeader>
        <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: avatar }} />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? colors.blackColor : colors.darkGreyColor}
              size={32}
              name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={!isGrid ? colors.blackColor : colors.darkGreyColor}
              size={32}
              name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      <SquareContainer>
        {posts &&
          posts.map((post: Post) => (isGrid ? <SquarePhoto key={post.id} {...post} /> : null))}
      </SquareContainer>
      {posts && posts.map((post: Post) => (isGrid ? null : <Post key={post.id} {...post} />))}
    </View>
  );
};
