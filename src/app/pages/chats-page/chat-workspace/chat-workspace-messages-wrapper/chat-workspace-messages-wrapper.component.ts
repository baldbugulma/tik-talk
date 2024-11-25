import { Component, inject, input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MessageInputComponent } from "../../../../common-ui/message-input/message-input.component";
import { ChatsService } from '../../../../data/services/chats.service';
import { Chat } from '../../../../data/services/interfaces/chat.interface';
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

  chat = input.required<Chat>()
  messages = this.chatsService.activeChatMessages

  async onSendMessage(messageText: string){
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText))
    await firstValueFrom(this.chatsService.getChatById(this.chat().id))

  }
}
