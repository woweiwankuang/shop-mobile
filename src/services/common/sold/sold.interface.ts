import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { SoldRec } from '../model/soldRec';
import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';

@Injectable()
export class SoldInterface {
    constructor(private http: HttpClient) {
    }


    /**
     * 新增销售记录
     * @param customer 顾客
     */
    addSoldRec(soldRec: SoldRec) {
        return this.http.post(ServerUrl.SERVER_URL + '/soldRecs', soldRec);
    }

    /**
     * 更新销售记录信息
     */
    updateSoldRec(soldRec: SoldRec) {
        return this.http.put(ServerUrl.SERVER_URL + '/soldRecs/' + soldRec.id, soldRec);
    }
}