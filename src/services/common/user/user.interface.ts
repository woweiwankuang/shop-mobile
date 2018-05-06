import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';
import { CreateUser } from '../../../pages/register/create-user';

@Injectable()
export class UserInterface {
    constructor(private http: HttpClient) {
    }

    /**
     * 注册用户
     */
    register(createUser:CreateUser){
        return this.http.post(ServerUrl.SERVER_URL + '/users', createUser);
    }
}