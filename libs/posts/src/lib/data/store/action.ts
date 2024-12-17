import {createActionGroup, props} from "@ngrx/store";
import {Profile} from "@tt/interfaces/profile";
import {CommentCreateDto, Post, PostCreateDto} from "../interfaces/post.interface";

export const postsActions = createActionGroup({
  // Источник действия. Используется для группировки действий по фиче или модулю.
  source: 'posts',
  // Определяем действия (events), связанные с профилями.
  events :{
    'fetch posts': props<{posts?: Post[]}>(),
    'posts loaded': props<{posts: Post[]}>(),
    'create post' : props<{payload: PostCreateDto}>(),
    'create comment': props<{payload: CommentCreateDto}>()
  }
})
