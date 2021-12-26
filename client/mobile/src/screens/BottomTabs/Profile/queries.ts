import { USER_FRAGMENT } from 'src/fragments/user';

import { gql } from '@apollo/client';

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
