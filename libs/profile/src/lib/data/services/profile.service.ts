import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { Profile } from '../interfaces/profile.interface';
import {Pageble} from "@tt/shared";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getSubscribersShortList(subscribers = 3): Observable<Profile[]> {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subscribers)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd: FormData = new FormData();
    fd.append('image', file);

    return this.http.post<Profile>(
      `${this.baseApiUrl}account/upload_image`,
      fd
    );
  }

  filterProfiles(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/accounts`, {
        params,
      })
      .pipe(tap((res) => this.filteredProfiles.set(res.items)));
  }
}
