import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { ChatWsRxjsService } from './chat-ws-rxjs.service';
import { AuthService, selectMe } from 'libs/data-access/src';
import { ChatWsService } from '../interfaces/chat-ws-service.interface';
import { ChatWSMessage } from '../interfaces/chat-messsage.interface';
import {
  Chat,
  GroupedMessage,
  LastMessageRes,
  Message,
} from '../interfaces/chat.interface';
import { isNewMessage, isUnreadMessage } from '../interfaces/type-guards';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  store = inject(Store);
  http = inject(HttpClient);
  #authService = inject(AuthService);
  me = this.store.selectSignal(selectMe);

  wsAdapter: ChatWsService = new ChatWsRxjsService();

  unreadMessages = signal<number>(0);

  activeChatMessages = signal<GroupedMessage[]>([]);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  connectWs() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWSMessage>;
  }

  disconnectWs() {
    return this.wsAdapter.disconnect();
  }

  refreshToken() {
    return this.#authService.refreshAuthToken();
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return;

    if (isUnreadMessage(message)) {
      this.unreadMessages.set(message.data.count);
      console.log(`Количество непрочитанных сообщений` + this.unreadMessages);
    }

    if (isNewMessage(message)) {
      const newMessage: Message = {
        id: message.data.id,
        userFromId: message.data.author,
        personalChatId: message.data.chat_id,
        text: message.data.message,
        createdAt: message.data.created_at,
        isRead: false,
        isMine: false,
      };

      const messageDate = newMessage.createdAt.split(' ')[0];
      const currentMessages = this.activeChatMessages();

      // Поиск группы сообщений по дате
      const groupIndex = currentMessages.findIndex(
        (group) => group.date === messageDate
      );

      if (groupIndex !== -1) {
        // Если группа с такой датой существует, добавляем сообщение в эту группу
        currentMessages[groupIndex].messages.push(newMessage);
      } else {
        // Если группа не существует, создаём новую
        currentMessages.push({
          date: messageDate,
          messages: [newMessage],
        });
      }

      currentMessages.sort((a, b) => a.date.localeCompare(b.date));

      // Обновляем сигнал
      this.activeChatMessages.set([...currentMessages]);
    }
  };

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`, {});
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        const groupedMessages = patchedMessages.reduce<GroupedMessage[]>(
          (acc, message) => {
            const date = message.createdAt.split('T')[0];

            const existingGroup = acc.find((group) => group.date === date);
            if (existingGroup) {
              // Если группа существует, добавляем сообщение
              existingGroup.messages.push(message);
            } else {
              // Если группы нет, создаем новую
              acc.push({ date, messages: [message] });
            }

            return acc;
          },
          []
        );

        this.activeChatMessages.set(groupedMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(message: string, chatId: number) {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
