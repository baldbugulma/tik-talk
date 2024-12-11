import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../../../../../../libs/profile/src/lib/data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../../../../../../libs/common-ui/src/lib/pipes/img-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
