import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import {PostComment} from "../../data";
import {AvatarCircleComponent} from "@tt/common-ui";


import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  comment = input<PostComment>();
}
