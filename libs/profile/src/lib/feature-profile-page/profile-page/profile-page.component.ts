import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {firstValueFrom, Observable, of, switchMap} from 'rxjs';
import {PostFeedComponent} from "@tt/posts";
import {ProfileService, selectMe} from "../../data";
import {ImgUrlPipe, SvgIconComponent} from "@tt/common-ui";
import {ProfileHeaderComponent} from "../../ui"
import { Profile } from '@tt/interfaces/profile';
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);

  route = inject(ActivatedRoute);
  router = inject(Router);

  store = inject(Store)

  isMyPage = signal(false);

  me = this.store.selectSignal(selectMe)

  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$: Observable<Profile | null> = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.me()?.id);

      if (id === 'me') {
        return of(this.me());
      }

      // Возвращаем Observable из сервиса
      return this.profileService.getAccount(id);
    })
  );
  async sendMessag(userId: number) {
    this.router.navigate([`/chats`, 'new'], {queryParams: {userId}});
  }
}
