import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';


import {
  ProfileCardComponent,
  ProfileFiltersComponent,
  ProfileService,
} from '@tt/profile';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, JsonPipe, ProfileFiltersComponent, AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService: ProfileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;

  constructor() {}
}
