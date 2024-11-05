import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pageble } from './interfaces/pagebale.interface';
import { Profile } from './interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http :HttpClient = inject(HttpClient)

  baseApiUrl :string = 'https://icherniakov.ru/yt-course/'

  constructor() { }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getSubscribersShortList(){
    return this.http.get<Pageble<Profile[]>>(`${this.baseApiUrl}account/subscribers`)
  }

  getMe(){
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
  }
}
