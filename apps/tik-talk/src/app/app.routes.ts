import { Routes } from '@angular/router';
import { ExperimentalComponent } from './pages/experimental/experimental.component';
import {
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { ChatsPageComponent, chatsRoutes } from '@tt/chats';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { LayoutComponent } from '@tt/layout';
import { provideState } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';
import { PostEffects, postsFeature } from '../../../../libs/posts/src/lib/data';
import { ProfileEffects, profileFeature } from '@tt/data-access/profile';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    providers: [provideState(profileFeature), provideEffects(ProfileEffects)],
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [provideState(postsFeature), provideEffects(PostEffects)],
      },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'chats', component: ChatsPageComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'experimental', component: ExperimentalComponent },
];
