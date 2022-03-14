import { gql, useMutation } from '@apollo/client';
import { SearchUserMutationArgs } from '@instcl/models/lib/mutations';

export const SEARCH = gql`
  mutation searchUser($term: String!) {
    searchUser(term: $term) {
      id
      name
      username
    }
  }
`;

export interface SearchUser {
  id: string;
  avatar: string;
  username: string;
  isFollowing: boolean;
  isSelf: boolean;
}

export interface SearchPost {
  id: string;
  files: {
    url: string;
  }[];
  likeCount: number;
  commentCount: number;
}

export interface SearchData {
  searchUser: SearchUser[];
}

export const useSearch = () => {
  const [search, { data, loading, error }] = useMutation<
    SearchData,
    SearchUserMutationArgs
  >(SEARCH);

  return { search, data, loading, error };
};
