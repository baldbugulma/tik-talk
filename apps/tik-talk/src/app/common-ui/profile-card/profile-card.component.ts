import { Component, Input } from '@angular/core';
import { Profile } from '../../../../../../libs/profile/src/lib/data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../../../../../libs/common-ui/src/lib/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
