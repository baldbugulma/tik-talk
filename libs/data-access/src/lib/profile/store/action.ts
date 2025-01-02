import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from '../../../index';

export const profileActions = createActionGroup({
  // Источник действия. Используется для группировки действий по фиче или модулю.
  source: 'profile',
  // Определяем действия (events), связанные с профилями.
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'save filter': props<{ filters: Record<string, any> }>(),
    'set page': props<{ page?: number }>(),

    'fetch getMe': emptyProps(),
    'save infoMe': props<{ profile: Profile }>(),
  },
});
