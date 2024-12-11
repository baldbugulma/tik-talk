import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import {
  CommentCreateDto,
  Post,
  PostComment,
  PostCreateDto,
} from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  #http = inject(HttpClient);

  posts = signal<Post[]>([]);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<PostComment>(`${this.baseApiUrl}comment/`, payload);
  }

  fetchPosts() {
    return this.#http
      .get<Post[]>(`${this.baseApiUrl}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }

  getCommentsByPostId(postId: number) {
    return this.#http
      .get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}
