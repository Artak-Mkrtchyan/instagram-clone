import { Post } from './Post';
import { User } from './User';

export type Like = {
  id: Number;
  user: User;
  post: Post;
  createdAt: String;
  updatedAt: String;
};
