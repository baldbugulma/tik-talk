import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';

import { ImgUrlPipe } from '../../../../../common-ui/src/lib/pipes/img-url.pipe';
import {LastMessageRes} from "@tt/chats";



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
