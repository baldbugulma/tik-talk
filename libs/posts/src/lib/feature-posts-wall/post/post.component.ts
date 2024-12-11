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



import { CommentComponent, PostInputComponent } from '../../ui';
import {Post, PostComment, PostService} from "../../data";
import {AddTimePipe, AvatarCircleComponent, SvgIconComponent} from "@tt/common-ui";



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
