import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  profileActions,
  selectFilteredProfiles,
} from '@tt/data-access/profile';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ProfileCardComponent } from '../../ui';
import { fromEvent, interval } from 'rxjs';
import { audit } from 'rxjs/operators';

@Component({
  selector: 'tt-profile-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollDirective, ProfileCardComponent],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileListComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);
  console = console;

  r2 = inject(Renderer2);

  hostElement = inject(ElementRef);

  @ViewChild('listWrapper', { static: false })
  listWrapper!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(audit(() => interval(500)))
      .subscribe((event) => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 30;
    this.r2.setStyle(this.listWrapper.nativeElement, 'height', `${height}px`);
  }

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }

  onScroll() {
    console.log('scroll');
    this.timeToFetch();
  }
}
