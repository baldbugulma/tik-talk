import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from "../../common-ui/sidebar/subscriber-card/subscriber-card.component";
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, SubscriberCardComponent, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  me$: Observable<Profile | null> = toObservable(this.profileService.me)

  subscribers$ = this.profileService.getSubscribersShortList(5)

  profile$: Observable<Profile | null> = this.route.params
    .pipe(
      switchMap(({id}) =>{
        if(id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )
}  
