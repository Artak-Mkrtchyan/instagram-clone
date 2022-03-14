import { File } from './File';
import { Like } from './Like';
import { User } from './User';

export type Post = {
  id: Number;
  location: String;
  caption: String;
  user: User;
  files: File[];
  likes: Like[];
  comments: Comment[];
  isLiked: Boolean;
  likeCount: Number;
  commentCount: Number;
  createdAt: String;
  updatedAt: String;
};
