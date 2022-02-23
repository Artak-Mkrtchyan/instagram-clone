import { gql, useMutation } from '@apollo/client';

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

export interface SearchVars {
  term: string;
}

export const useSearch = () => {
  const [search, { data, loading, error }] = useMutation<
    SearchData,
    SearchVars
  >(SEARCH);

  return { search, data, loading, error };
};
