import { Routes } from '@angular/router';
import { canActivateAuth } from '../../../../libs/auth/src/lib/auth/access.guard';
import { LayoutComponent } from './common-ui/layout/layout.component';


import { ExperimentalComponent } from './pages/experimental/experimental.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SettingsPageComponent } from '../../../../libs/profile/src/lib/feature-profile-settings/settings-page/settings-page.component';
import {ProfilePageComponent} from "@tt/profile";
import {ChatsPageComponent} from "../../../../libs/chats/src/lib/feature-chats-workspace/chats-page/chats.component";
import {chatsRoutes} from "../../../../libs/chats/src/lib/feature-chats-workspace/chats-page/chatsRoutes";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'search', component: SearchPageComponent },
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
