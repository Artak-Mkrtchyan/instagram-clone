import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { constants } from 'src/constants/constants';
import { CommonNavigationRoutes } from 'src/navigation/config';
import { colors } from 'src/styles';
import styled from 'styled-components/native';

import { gql, useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View`
  margin-bottom: 40px;
`;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 5px 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

export const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
}: {
  id: string;
  user: {
    id: string;
    avatar?: string;
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
  location?: string;
  createdAt: string;
}) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });

  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p);
    try {
      await toggleLikeMutaton();
    } catch (e) {}
  };

  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate(CommonNavigationRoutes.USER_DETAIL, {
              username: user.username,
            })
          }>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate(CommonNavigationRoutes.USER_DETAIL, {
              username: user.username,
            })
          }>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper showsPagination={false} style={{ height: constants.height / 2.5 }}>
        {files.map((file) => (
          <Image
            style={{ width: constants.width, height: constants.height / 2.5 }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={24}
                color={isLiked ? colors.redColor : colors.blackColor}
                name={isLiked ? 'ios-heart' : 'md-heart'}
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                color={colors.blackColor}
                size={24}
                name={Platform.OS === 'ios' ? 'ios-chatbubble' : 'md-chatbubble'}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? '1 like' : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};
