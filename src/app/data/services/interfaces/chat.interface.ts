import { Profile } from './profile.interface';

export interface Chat {
    id: 0,
    userFirst: Profile,
    userSecond: Profile,
    companion?: Profile,
    messages: Message[]
}

export interface Message{
    id: number,
    userFromId: number,
    personalChatId: number,
    text: string,
    createdAt: string,
    isRead: boolean,
    updatedAt: string,
    user?: Profile,
    isMine: boolean
}

export interface LastMessageRes{
    id: number,
    userFrom: Profile,
    message: string | null,
}