import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";


import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {}
