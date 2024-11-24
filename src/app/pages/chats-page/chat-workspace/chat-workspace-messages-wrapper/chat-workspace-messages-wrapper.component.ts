import { Component, inject } from '@angular/core';
import { MessageInputComponent } from "../../../../common-ui/message-input/message-input.component";
import { ChatsService } from '../../../../data/services/chats.service';
import { ChatWorkspaceMessageComponent } from "./chat-workspace-message/chat-workspace-message.component";

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService)

  onSendMessage(messageText: string){

  }
}
