import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ServerUrl } from '../../../global';


@Injectable()
export class BindCodeInterface {
  constructor(private http: HttpClient) {
  }

  /**
   * 获取自己的绑定码
   */
  getMyBindCode() {
    return this.http.get(ServerUrl.SERVER_URL + '/userBindInfos', {
      responseType: 'text'
    });
  }

  /**
   * 生成/重新生成自己的绑定码
   */
  generateBindCode() {
    return this.http.post(ServerUrl.SERVER_URL + '/userBindInfoGenerates', null, {
      responseType: 'text'
    });
  }
}