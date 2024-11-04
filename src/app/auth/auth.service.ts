import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cookieService = inject(CookieService)
  http = inject(HttpClient)
  router = inject(Router)
  baseApiUrl :string = 'https://icherniakov.ru/yt-course/auth'

  token: string | null = null
  refresh_token: string | null = null

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get('token')
      this.refresh_token = this.cookieService.get('refreshToken')
    }
    return !!this.token
  }

  login(payload: {username: string, password: string}){
  const fd = new FormData();

  fd.append('username', payload.username)
  fd.append('password', payload.password)

  return this.http.post<TokenResponse>(`${this.baseApiUrl}/token`,
    fd).pipe(
      tap((val: TokenResponse) => this.saveTokens(val))
    )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}/refresh`, {
      refresh_token : this.refresh_token
    }).pipe(
      tap((val: TokenResponse) => this.saveTokens(val)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout(){
    this.cookieService.deleteAll()
    this.refresh_token = null
    this.token = null
    this.router.navigate(['login'])
  }

  saveTokens(res: TokenResponse){
    this.token = res.access_token;
    this.refresh_token = res.refresh_token;

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refresh_token)
  }
}
