import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';

import { ProfileFiltersComponent } from '../../feature-profile-list';

import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '@tt/data-access/profile';

// import {ProfileCardComponent, ProfileFiltersComponent, ProfileService} from "@tt/profile";

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}
}
