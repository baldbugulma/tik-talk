import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';

import { webSocket } from 'rxjs/webSocket';
import { finalize, Observable, tap } from 'rxjs';
import { ChatWSMessage } from '../interfaces/chat-messsage.interface';
import {
  ChatConnectionWsParams,
  ChatWsService,
} from '../interfaces/chat-ws-service.interface';

export class ChatWsRxjsService implements ChatWsService {
  #socket: WebSocketSubject<ChatWSMessage> | null = null;

  connect(params: ChatConnectionWsParams): Observable<ChatWSMessage> {
    if (!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token],
      });
    }

    return this.#socket.asObservable().pipe(
      tap((message: ChatWSMessage) => {
        params.handleMessage(message); // Обработка сообщения
      }),
      finalize(() => console.log('WebSocket connection closed'))
    );
  }

  sendMessage(text: string, chatId: number): void {
    this.#socket?.next({
      text,
      chat_id: chatId,
    });
  }

  disconnect(): void {
    this.#socket?.complete();
  }
}
