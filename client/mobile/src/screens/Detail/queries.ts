import { POST_FRAGMENT } from 'src/fragments/post';

import { gql } from '@apollo/client';

export const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
