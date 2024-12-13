import { Routes } from '@angular/router';
import { ExperimentalComponent } from './pages/experimental/experimental.component';
import {ProfilePageComponent, SearchPageComponent, SettingsPageComponent} from "@tt/profile";
import {ChatsPageComponent, chatsRoutes} from "@tt/chats";
import {canActivateAuth, LoginPageComponent} from "@tt/auth";
import {LayoutComponent} from "@tt/layout";






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
