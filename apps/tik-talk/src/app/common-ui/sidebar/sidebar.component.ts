import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgFor,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService: ProfileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems: any[] = [
    {
      label: `Моя страница`,
      icon: `home`,
      link: 'profile/me',
    },
    {
      label: `Чаты`,
      icon: `chats`,
      link: 'chats',
    },
    {
      label: `Поиск`,
      icon: `search`,
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
