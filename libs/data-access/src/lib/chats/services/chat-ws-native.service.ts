import {
  ChatConnectionWsParams,
  ChatWsService,
} from '@tt/data-access/chats/interfaces/chat-ws-service.interface';

export class ChatWsNativeService implements ChatWsService {
  #socket: WebSocket | null = null;

  connect(params: ChatConnectionWsParams) {
    if (this.#socket) return;
    this.#socket = new WebSocket(params.url, [params.token]);

    this.#socket.onmessage = (event: MessageEvent) => {
      params.handleMessage(JSON.parse(event.data));
    };

    this.#socket.onclose = () => {
      console.log('Connection closed');
    };
  }

  sendMessage(text: string, chatId: number) {
    this.#socket?.send(
      JSON.stringify({
        text,
        chat_id: chatId,
      })
    );
  }

  disconnect() {
    this.#socket?.close();
  }
}
