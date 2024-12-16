import {Profile} from "@tt/interfaces/profile";
import {createFeature, createReducer, on} from "@ngrx/store";
import {Post} from "../interfaces/post.interface";
import {postsAction} from "./action";

export interface PostsState{
  posts: Post[],

}

export const initialState: PostsState = {
  posts: [],
}

export const postsFeature = createFeature({
  // Название фичи (раздела состояния).
  name: 'postsFeature',
  reducer: createReducer(
    // Начальное состояние.
    initialState,
    // Обрабатываем действие 'profilesLoaded'.
    on(postsAction.postsLoaded, (state: PostsState, payload: {posts: Post[]})=>{
      // Возвращаем новое состояние с обновлённым списком постов.
      return {
        ...state,
        profiles: payload.posts
      }
    })
  )
})
