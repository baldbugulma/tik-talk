// import {ProfileCardComponent, ProfileFiltersComponent, ProfileService} from "@tt/profile";
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProfileFiltersComponent } from '../../feature-profile-list';
import { ProfileListComponent } from '../profile-list/profile-list.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileFiltersComponent, ProfileListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {}
