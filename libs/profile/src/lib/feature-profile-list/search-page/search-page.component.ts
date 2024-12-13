import { Component, inject } from '@angular/core';
import {ProfileCardComponent} from "../../ui";
import {ProfileFiltersComponent} from "../../feature-profile-list";
import {ProfileService} from "../../data";
// import {ProfileCardComponent, ProfileFiltersComponent, ProfileService} from "@tt/profile";


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService: ProfileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;

  constructor() {}
}
