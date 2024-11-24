import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { SubscriberCardComponent } from "../../common-ui/sidebar/subscriber-card/subscriber-card.component";
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ChatsService } from '../../data/services/chats.service';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
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
  chatsService = inject(ChatsService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  isMyPage = signal(false)

  me$: Observable<Profile | null> = toObservable(this.profileService.me)

  subscribers$ = this.profileService.getSubscribersShortList(5)

  profile$: Observable<Profile | null> = this.route.params
    .pipe(
      switchMap(({id}) =>{
        this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
        if(id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )
  
    async sendMessag(userId: number){
      await firstValueFrom(this.chatsService.createChat(userId))
        .then((res) =>{
          this.router.navigate([`/chats/${res.id}`])
        })
    }
}  
