import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { LastMessageRes } from '../../../data/services/interfaces/chat.interface';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent, ImgUrlPipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
