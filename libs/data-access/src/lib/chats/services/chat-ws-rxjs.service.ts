import {
  ChatConnectionWsParams,
  ChatWsService,
} from '@tt/data-access/chats/interfaces/chat-ws-service.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { ChatWSMessage } from '@tt/data-access/chats/interfaces/chat-messsage.interface';
import { webSocket } from 'rxjs/webSocket';
import { finalize, Observable, tap } from 'rxjs';

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
