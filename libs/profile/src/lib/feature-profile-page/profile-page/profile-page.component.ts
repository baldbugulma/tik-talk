import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { PostFeedComponent } from '@tt/posts';

import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui';

import { Store } from '@ngrx/store';
import { Profile, ProfileService, selectMe } from '@tt/data-access/profile';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);

  route = inject(ActivatedRoute);
  router = inject(Router);

  store = inject(Store);

  isMyPage = signal(false);

  me$: Observable<Profile | null> = this.store.select(selectMe);

  subscribers$ = this.profileService.getSubscribersShortList(5);

  profile$: Observable<Profile | null> = this.route.params.pipe(
    switchMap(({ id }) =>
      this.me$.pipe(
        switchMap((meProfile) => {
          this.isMyPage.set(id === 'me' || id === meProfile?.id);

          if (id === 'me') {
            return of(meProfile);
          }

          return this.profileService.getAccount(id);
        })
      )
    )
  );

  async sendMessag(userId: number) {
    this.router.navigate([`/chats`, 'new'], { queryParams: { userId } });
  }
}
