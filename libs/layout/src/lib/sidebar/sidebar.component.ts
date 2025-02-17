import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';

import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  profileActions,
  ProfileService,
  selectMe,
} from '@tt/data-access/profile';
import { ChatsService } from '@tt/data-access/chats';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthService } from '@tt/data-access/auth';
import { isErrorMessage } from '@tt/data-access/chats/interfaces/type-guards';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  profileService: ProfileService = inject(ProfileService);
  #chatService = inject(ChatsService);
  store = inject(Store);
  destoryRef = inject(DestroyRef);
  authService: AuthService = inject(AuthService);
  wsSubscribe!: Subscription;

  unreadMessageCount = this.#chatService.unreadMessages;
  subscribers$ = this.profileService.getSubscribersShortList();
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

  connect() {
    this.wsSubscribe?.unsubscribe();
    this.wsSubscribe = this.#chatService
      .connectWs()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((message) => {
        if (isErrorMessage(message)) {
          console.log(message);
          this.reconnect();
        }
      });
  }

  async reconnect() {
    await firstValueFrom(this.authService.refreshAuthToken());
    this.connect();
  }

  constructor() {}

  ngOnInit() {
    this.store.dispatch(profileActions.fetchGetMe());
    this.connect();
  }
}
