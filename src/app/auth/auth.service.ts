import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cookieService = inject(CookieService)
  http = inject(HttpClient)
  baseApiUrl :string = 'https://icherniakov.ru/yt-course/auth'

  token: string | null = null
  refresh_token: string | null = null

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }

  login(payload: {username: string, password: string}){
  const fd = new FormData();

  fd.append('username', payload.username)
  fd.append('password', payload.password)

  return this.http.post<TokenResponse>(`${this.baseApiUrl}/token`,
    fd).pipe(
      tap((val: TokenResponse) => {
        this.token = val.access_token;
        this.refresh_token = val.refresh_token;

        this.cookieService.set('token', this.token)
        this.cookieService.set('refreshToken', this.refresh_token)
      })
    )
  }
}
