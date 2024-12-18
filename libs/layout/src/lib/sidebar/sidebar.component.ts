import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import {profileActions, ProfileService, selectMe} from "@tt/profile";
import {ImgUrlPipe, SvgIconComponent} from "@tt/common-ui";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgFor,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService: ProfileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();

  store = inject(Store)

  me = this.store.selectSignal(selectMe)

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
    this.store.dispatch(profileActions.fetchGetMe())
    console.log(this.me)
    // firstValueFrom(this.profileService.getMe());
  }
}
