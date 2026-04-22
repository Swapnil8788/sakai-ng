import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RefreshToken, User, UserLoginResponse, registerUserDetails } from '../types/user';
import { LOGIN, LOGOUT, REFRESH_TOKEN } from './UrlPaths';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class Api {
  URL = 'hrm-dev01-fyf4g6djdzcfejcn.centralindia-01.azurewebsites.net'
  constructor(private http: HttpClient, private router: Router) {

  }
  getData() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  get(path: string) {
    return this.http.get(this.URL + path);
  }
  login(userDetails: User): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.URL + LOGIN, userDetails);
  }
  register(registerUserDetails: registerUserDetails) {
    return this.http.post(this.URL + '/api/auth/register', registerUserDetails);
  }
  logout() {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.http.post(this.URL + LOGOUT, { refreshToken: refreshToken });
  }
  refreshToken(refreshToken: RefreshToken): Observable<RefreshToken> {
    return this.http.post<RefreshToken>(this.URL + REFRESH_TOKEN, refreshToken, {
      headers: {
        Authorization: `Bearer ${refreshToken.accessToken}`
      }
    })
  }
}
