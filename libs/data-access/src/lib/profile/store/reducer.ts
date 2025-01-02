import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './action';
import { Profile } from '../../../index';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, any>;
  me: Profile | null;
  page: number;
  size: number;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  me: null,
  page: 1,
  size: 10,
};

export const profileFeature = createFeature({
  // Название фичи (раздела состояния).
  name: 'profileFeature',
  reducer: createReducer(
    // Начальное состояние.
    initialState,
    // Обрабатываем действие 'profilesLoaded'.
    on(
      profileActions.profilesLoaded,
      (state: ProfileState, payload: { profiles: Profile[] }) => {
        // Возвращаем новое состояние с обновлённым списком профилей.
        return {
          ...state,
          profiles: payload.profiles,
        };
      }
    ),

    //Сохраняем фильтры в сторе
    on(profileActions.saveFilter, (state: ProfileState, { filters }) => {
      return {
        ...state,
        profileFilters: filters,
      };
    }),

    on(profileActions.saveInfoMe, (state: ProfileState, { profile }) => {
      return {
        ...state,
        me: profile,
      };
    })
  ),
});
