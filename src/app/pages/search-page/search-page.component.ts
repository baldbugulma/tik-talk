import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, JsonPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService :ProfileService = inject(ProfileService)
  profiles: Profile[] = []

  constructor(){
    this.profileService.getTestAccounts()
    .subscribe(val => {
      this.profiles = val;
    })
  }

}