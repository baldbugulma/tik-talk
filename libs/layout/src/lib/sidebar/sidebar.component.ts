import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { profileActions, ProfileService, selectMe } from '@tt/profile';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { ChatsService } from '@tt/chats';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  #chatService = inject(ChatsService);

  unreadMessageCount = this.#chatService.unreadMessages;

  subscribers$ = this.profileService.getSubscribersShortList();

  store = inject(Store);

  me = this.store.selectSignal(selectMe);

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

  constructor() {
    this.#chatService.connectWs().pipe(takeUntilDestroyed()).subscribe();
    console.log('Непрочитаные сообщения' + this.unreadMessageCount);
  }

  ngOnInit() {
    this.store.dispatch(profileActions.fetchGetMe());
    // firstValueFrom(this.profileService.getMe());
  }
}
