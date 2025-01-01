import { Profile } from '@tt/data-access/profile/interfaces/profile.interface';

export interface Chat {
  id: 0;
  userFirst: Profile;
  userSecond: Profile;
  companion?: Profile;
  messages: Message[];
  groupedMessage: GroupedMessage[];
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt?: string;
  user?: Profile | null;
  isMine: boolean;
}

export interface LastMessageRes {
  id: number;
  userFrom: Profile;
  message: string | null;
}

export interface GroupedMessage {
  date: string;
  messages: Message[];
}
