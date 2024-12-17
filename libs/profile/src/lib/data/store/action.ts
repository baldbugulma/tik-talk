import {createActionGroup, props} from "@ngrx/store";
import {Profile} from "@tt/interfaces/profile";

export const profileActions = createActionGroup({
  // Источник действия. Используется для группировки действий по фиче или модулю.
  source: 'profile',
  // Определяем действия (events), связанные с профилями.
  events :{
    'filter events': props<{filters: Record<string, any>}>(),
    'profiles loaded': props<{profiles: Profile[]}>(),
    'save filter': props<{filters: Record<string, any>}>()
  }
})
