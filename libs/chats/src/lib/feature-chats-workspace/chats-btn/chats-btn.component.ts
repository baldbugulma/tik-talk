import { Component, inject, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { ChatsService, LastMessageRes } from '@tt/chats';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent, AsyncPipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chatService = inject(ChatsService);
  chat = input<LastMessageRes>();
}
