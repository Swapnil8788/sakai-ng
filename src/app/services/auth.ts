import { inject, Injectable } from '@angular/core';
import { Api } from './api';
import { GET_ROLES } from './UrlPaths';
import { RefreshToken, User, registerUserDetails } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  api = inject(Api);

  getData(){
    return this.api.getData();
  }
  getRoles(){
    return this.api.get(GET_ROLES);
  }
  login(userDetails: User){
    return this.api.login(userDetails)
  }

  register(registerUserDetails: registerUserDetails){
    return this.api.register(registerUserDetails);
  }
  logout(){
    return this.api.logout();
    
  }

  refreshToken(refreshToken: RefreshToken){
    return this.api.refreshToken(refreshToken);
  }

}
