import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { audit, firstValueFrom, fromEvent, interval } from 'rxjs';
import { PostService } from '../../../data/services/post.service';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  postService = inject(PostService);
  feed = this.postService.posts;

  // @HostListener('window:resize')
  // onWindowResize(){
  //   this.resizeFeed()
  // }

  r2: Renderer2 = inject(Renderer2);

  hostElement = inject(ElementRef);

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(audit(() => interval(500)))
      .subscribe((event) => {
        this.resizeFeed();
        console.log(event);
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  createPostOrComment(data: any) {
    console.log(data);

    if (!data.text) return;
    if (!data.isCommentInput) {
      firstValueFrom(
        this.postService.createPost({
          title: 'Новый пост',
          content: data.text,
          authorId: data.authorId,
        })
      );
    }

    if (data.isCommentInput) {
      firstValueFrom(
        this.postService.createComment({
          text: data.text,
          postId: data.postId,
          authorId: data.authorId,
        })
      );
      return;
    }
  }
}
