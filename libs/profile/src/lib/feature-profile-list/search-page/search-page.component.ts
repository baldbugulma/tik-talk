import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { Profile } from '../../../../../../libs/profile/src/lib/data/interfaces/profile.interface';
import { ProfileService } from '../../../../../../libs/profile/src/lib/data/services/profile.service';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';

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
