import { ChatWSMessage } from './chat-messsage.interface';
import { Observable } from 'rxjs';

export interface ChatConnectionWsParams {
  url: string;
  token: string;
  handleMessage: (message: ChatWSMessage) => void;
}

export interface ChatWsService {
  connect: (params: ChatConnectionWsParams) => void | Observable<ChatWSMessage>;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
