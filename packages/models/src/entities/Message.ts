import { Channel } from './Channel';
import { User } from './User';

export type Message = {
  id: Number;
  text: String;
  user: User;
  channel: Channel;
  createdAt: String;
  updatedAt: String;
};
