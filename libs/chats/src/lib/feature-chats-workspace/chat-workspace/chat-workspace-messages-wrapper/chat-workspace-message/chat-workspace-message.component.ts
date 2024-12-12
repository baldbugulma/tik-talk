import { DatePipe } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { Message } from '../../../../../../../../../libs/chats/src/lib/data/interfaces/chat.interface';
import { FormatDatePipe } from '../../../../../../../../../libs/common-ui/src/lib/pipes/format-date.pipe';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, FormatDatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
