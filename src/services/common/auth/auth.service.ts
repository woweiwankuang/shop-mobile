import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

import { SkyAccessToken } from './access-token';
// import { NecErrorCollectService } from './../error-collect/error-collect.service';
import { SkyLocalStorageService } from '../localStorage/local-storage.service';
import { ServerUrl } from '../../../global';
// import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,
    private localStorage: SkyLocalStorageService
    // private userService: UserService,
    // private errorCollectService: NecErrorCollectService
  ) {
  }

  // 如果传参, 则为set方法; 没有参数, 则为get方法
  authenticate(token?: SkyAccessToken): boolean {
    if (token) {
      this.setToken(token);
      return true;
    }
    else {
      if (!this.localStorage.get('token')) {
        return false;
      }

      if (new Date().getTime() > this.localStorage.get('token').expire_time) {
        return false;
      }

      // this.errorCollectService.init(this.userService.getUserInfo());
      return true;
    }
  }


  // 获取存储的token信息
  getToken(): SkyAccessToken {
    return this.localStorage.get('token');
  }

  // 设置token信息
  setToken(token: SkyAccessToken): void {
    token.expire_time = new Date().getTime() + token.expires_in * 1000;
    this.localStorage.set('token', token);
  }

  // 清除token信息
  clearToken(): void {
    this.localStorage.del('token');
  }

  // 用户登录, 请求token
  login(username: string, password: string): Observable<SkyAccessToken> {
    let postBody = 'username=' + username + '&password=' + password + '&grant_type=password';
    return this.http.post<SkyAccessToken>(ServerUrl.SERVER_URL + '/oauth/token', postBody, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('web:'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    });
  }

  // 用户登出
  logout(): void {
    this.clearToken();
    // this.errorCollectService.clear();
  }
}
