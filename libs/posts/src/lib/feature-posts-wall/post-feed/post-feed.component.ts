import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { audit, firstValueFrom, fromEvent, interval } from 'rxjs';

import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import {postsActions, PostService, selectPosts} from "../../data";
import {Store} from "@ngrx/store";

import { ChangeDetectionStrategy } from '@angular/core';
import { TestDirective } from './test.directive';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent, TestDirective],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent {
  store = inject(Store);
  postService = inject(PostService);
  feed = this.store.selectSignal(selectPosts);

  // @HostListener('window:resize')
  // onWindowResize(){
  //   this.resizeFeed()
  // }

  r2: Renderer2 = inject(Renderer2);

  hostElement = inject(ElementRef);

  constructor() {}

  ngOnInit() {
    this.store.dispatch(postsActions.fetchPosts({}));
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
      this.store.dispatch(
        postsActions.createPost({
          payload: {
            title: 'Новый пост',
            content: data.text,
            authorId: data.authorId,
          },
        })
      );
    }

    if (data.isCommentInput) {
      this.store.dispatch(
        postsActions.createComment({
          payload: {
            text: data.text,
            postId: data.postId,
            authorId: data.authorId,
          },
        })
      );
      return;
    }
  }
}
