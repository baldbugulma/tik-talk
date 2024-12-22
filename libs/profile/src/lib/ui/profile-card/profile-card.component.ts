import {Component, inject, Input} from '@angular/core';
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';

import {Profile} from "@tt/interfaces/profile";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink, SvgIconComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {

  router = inject(Router);

  @Input() profile!: Profile;

  async sendMessage(userId: number) {
    this.router.navigate([`/chats`, 'new'], {queryParams: {userId}});
  }
}
