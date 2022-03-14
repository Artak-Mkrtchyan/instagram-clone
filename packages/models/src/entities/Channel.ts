import { Message } from './Message';
import { User } from './User';

export type Channel = {
  id: Number;
  participants: User[];
  messages: Message[];
  createdAt: String;
  updatedAt: String;
};
