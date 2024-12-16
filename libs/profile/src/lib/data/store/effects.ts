import {inject, Injectable} from "@angular/core";
import { ProfileService } from '../services/profile.service';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action} from "rxjs/internal/scheduler/Action";
import {profileActions} from "./action";
import {map, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)

  // Создаем эффект для фильтрации профилей.
  filterProfiles = createEffect(()=> {
    return this.actions$.pipe(
      // Если action равен filterEvents то делаем дальше.
      ofType(profileActions.filterEvents),
      // Переключаемся на другой поток, вызываем метод фильтрации с переданными параметрами
      switchMap(({filters}) =>{
        return this.profileService.filterProfiles(filters)
      }),
      // После получения рещультата, вызываем action 'profilesLoaded' с загруженными профилями.
      map(res => profileActions.profilesLoaded({profiles:res.items}))
    )
  })
}