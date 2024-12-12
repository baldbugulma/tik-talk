import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { SubscriberCardComponent } from '../../../../../../apps/tik-talk/src/app/common-ui/sidebar/subscriber-card/subscriber-card.component';
import { SvgIconComponent } from '../../../../../common-ui/src/lib/components/svg-icon/svg-icon.component';

import { Profile } from '../../data/interfaces/profile.interface';

import { ImgUrlPipe } from '../../../../../common-ui/src/lib/pipes/img-url.pipe';
import {PostFeedComponent} from "@tt/posts";
import {ProfileService} from "@tt/profile";
import {ChatsService} from "@tt/chats";



@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isMyPage = signal(false);

  me$: Observable<Profile | null> = toObservable(this.profileService.me);

  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$: Observable<Profile | null> = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessag(userId: number) {
    await firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate([`/chats/${res.id}`]);
    });
  }
}