import {
  ChatWSMessage,
  ChatWSNewMessage,
  ChatWSUnreadMessage,
} from './chat-messsage.interface';

export function isUnreadMessage(
  message: ChatWSMessage
): message is ChatWSUnreadMessage {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessage(
  message: ChatWSMessage
): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message';
}
