// import {ProfileCardComponent, ProfileFiltersComponent, ProfileService} from "@tt/profile";
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';

import { ProfileFiltersComponent } from '../../feature-profile-list';

import { Store } from '@ngrx/store';
import {
  profileActions,
  selectFilteredProfiles,
} from '@tt/data-access/profile';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);
  console = console;

  constructor() {}

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (!entries.length) return;

    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch();
    }
  }

  onScroll() {
    console.log('scroll');
    this.timeToFetch();
  }
}
