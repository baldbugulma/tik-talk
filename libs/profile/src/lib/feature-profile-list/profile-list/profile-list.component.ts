import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-profile-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileListComponent {}
