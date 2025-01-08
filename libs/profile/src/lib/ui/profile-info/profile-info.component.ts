import { Component, input } from '@angular/core';
import { Profile } from '@tt/data-access/profile';

@Component({
  selector: 'tt-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent {
  profile = input<Profile | null>();
}
