import {
  ChatWSError,
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

export function isErrorMessage(message: ChatWSMessage): message is ChatWSError {
  return (
    'status' in message &&
    message.status === 'error' &&
    'message' in message &&
    typeof message.message === 'string'
  );
}
