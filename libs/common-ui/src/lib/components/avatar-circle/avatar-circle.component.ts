import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '../../pipes';


import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-avatar-circle',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>();
}
