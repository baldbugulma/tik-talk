import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


import {Profile} from "@tt/profile";
import {ImgUrlPipe} from "@tt/common-ui";

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
