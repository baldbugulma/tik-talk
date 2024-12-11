import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../../../../libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { PostComment } from '../../../../../../../../libs/posts/src/lib/data/interfaces/post.interface';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
