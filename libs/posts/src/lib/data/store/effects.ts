import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action} from "rxjs/internal/scheduler/Action";

import {map, switchMap, tap} from "rxjs";
import {PostService} from "../services/post.service";
import {postsActions} from "./action";

@Injectable({
  providedIn: 'root'
})
export class PostEffects {
  postService = inject(PostService)
  actions$ = inject(Actions)

  // Создаем эффект для постов.
  fetchPosts = createEffect(()=> {
    return this.actions$.pipe(
      // Если action равен fetchPosts то делаем дальше.
      ofType(postsActions.fetchPosts),
      tap(() => console.log('Effect triggered: fetchPosts')),
      // Переключаемся на другой поток, вызываем метод фильтрации с переданными параметрами
      switchMap(() =>{
        return this.postService.fetchPosts()
      }),
      // После получения результата, вызываем action 'postsLoaded' с загруженными профилями.

      map(res => postsActions.postsLoaded({posts:res}))
    )
  })
}
