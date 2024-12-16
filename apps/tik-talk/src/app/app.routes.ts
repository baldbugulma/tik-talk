import { Routes } from '@angular/router';
import { ExperimentalComponent } from './pages/experimental/experimental.component';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent
} from "@tt/profile";
import {ChatsPageComponent, chatsRoutes} from "@tt/chats";
import {canActivateAuth, LoginPageComponent} from "@tt/auth";
import {LayoutComponent} from "@tt/layout";
import {provideState} from "@ngrx/store";

import {provideEffects} from "@ngrx/effects";






export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      { path: 'profile/:id', component: ProfilePageComponent },
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
