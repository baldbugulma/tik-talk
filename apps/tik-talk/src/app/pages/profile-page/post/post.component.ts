import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import {
  Post,
  PostComment,
} from '../../../data/services/interfaces/post.interface';
import { PostService } from '../../../data/services/post.service';
import { AddTimePipe } from '../../../helpers/pipes/add-time.pipe';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    CommonModule,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    AddTimePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();

  postService = inject(PostService);

  comments = signal<PostComment[]>([]);

  @Output() outDataPost = new EventEmitter<{
    text: string | null;
    postId: number | null;
    authorId: number | null;
    isCommentInput: boolean;
  }>();

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );
    // @ts-ignore
    this.comments.set(comments);
  }

  setData(data: any) {
    this.outDataPost.emit(data);
    this.onCreated();
  }
}
