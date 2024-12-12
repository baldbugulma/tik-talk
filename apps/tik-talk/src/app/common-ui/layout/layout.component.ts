import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../../../../../libs/profile/src/lib/data/services/profile.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}