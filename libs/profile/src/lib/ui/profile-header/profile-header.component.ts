import { Component, input } from '@angular/core';
import { Profile } from '@tt/data-access/profile/interfaces/profile.interface';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
