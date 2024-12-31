import { Component, inject, Input } from '@angular/core';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';

import { Router, RouterLink } from '@angular/router';
import { Profile } from '@tt/data-access/profile';

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
    this.router.navigate([`/chats`, 'new'], { queryParams: { userId } });
  }
}
