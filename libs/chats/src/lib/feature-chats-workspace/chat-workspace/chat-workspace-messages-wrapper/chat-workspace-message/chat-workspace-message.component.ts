import { DatePipe } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';



import {AvatarCircleComponent, FormatDatePipe} from "@tt/common-ui";
import {Message} from "@tt/chats";

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, FormatDatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
