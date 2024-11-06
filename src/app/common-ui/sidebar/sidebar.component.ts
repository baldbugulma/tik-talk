import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgFor, SubscriberCardComponent, RouterLink, AsyncPipe, JsonPipe,ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})


export class SidebarComponent {

  profileService: ProfileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()
  
  me = this.profileService.me

  menuItems:any[] = [
    {
      label: `Моя страница`,
      icon: `home`,
      link: ''
    },
    {
      label: `Чаты`,
      icon: `chats`,
      link: 'chats'
    },
    {
      label: `Поиск`,
      icon: `search`,
      link: 'search'
    },
  ]

  ngOnInit(){
    firstValueFrom(this.profileService.getMe())  
  }
}
