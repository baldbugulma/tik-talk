import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './action';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs';
import {
  ProfileService,
  selectFilters,
  selectProfilePageble,
} from '../../../index';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);
  store = inject(Store);

  // Создаем эффект для фильтрации профилей.
  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this.store.select(selectFilters),
        this.store.select(selectProfilePageble)
      ),
      switchMap(([_, filters, pageble]) => {
        console.log([_, filters, pageble]);
        return this.profileService
          .filterProfiles({
            ...pageble,
            ...filters,
          })
          .pipe(
            concatMap((res) => [
              profileActions.profilesLoaded({ profiles: res.items }),
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
