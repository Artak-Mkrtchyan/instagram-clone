import { User } from '../entities';

export interface SearchUserMutationArgs {
  term: string;
}

export type SearchUserMutationResponseData = User;
