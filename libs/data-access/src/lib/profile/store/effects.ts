import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './action';
import { concatMap, map, switchMap } from 'rxjs';
import { ProfileService } from '../../../index';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);

  // Создаем эффект для фильтрации профилей.
  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      switchMap(({ filters }) => {
        return this.profileService
          .filterProfiles(filters)
          .pipe(
            concatMap((res) => [
              profileActions.profilesLoaded({ profiles: res.items }),
              profileActions.saveFilter({ filters }),
            ])
          );
      })
    );
  });

  //Получаем информацию о собственном профиле
  getMe = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.fetchGetMe),
      switchMap(() =>
        this.profileService
          .getMe()
          .pipe(map((profile) => profileActions.saveInfoMe({ profile })))
      )
    );
  });
}
