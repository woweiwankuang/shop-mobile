import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { SoldRec } from '../model/sold-rec';
import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';
import { SoldRecDTO } from '../../../pages/sold/sold-search/sold-rec-dto';

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

    /**
     * 通过顾客查询所有销售记录
     */
    queryAllSoldRecByCustomer(customerIds: number[]) {
        let customerIdStringIds: string[];
        if (customerIds.length == 0) {
            customerIdStringIds = [];
        } else {
            customerIdStringIds = customerIds.map(id => id.toString());
        }
        return this.http.get(ServerUrl.SERVER_URL + '/soldRecs', { params: { 'customerIds': customerIdStringIds, 'type': 'customer' } })
            .map((resp: SoldRecDTO[]) => {
                return resp.map(item => JsonUtil.jsonConvert(item, SoldRecDTO));
            });
    }

    /**
     * 通过时间查询所有销售记录
     */
    queryAllSoldRecByTime(startTime: number, endTime: number) {
        return this.http.get(ServerUrl.SERVER_URL + '/soldRecs', { params: { 'startTime': startTime.toString(), 'endTime': endTime.toString() , 'type': 'time' } })
            .map((resp: SoldRecDTO[]) => {
                return resp.map(item => JsonUtil.jsonConvert(item, SoldRecDTO));
            });
    }

    /**
     * 查询单个销售记录
     */
    querySoldRecById(id:number) {
        return this.http.get(ServerUrl.SERVER_URL + '/soldRecs/' + id)
        .map(resp => JsonUtil.jsonConvert(resp, SoldRecDTO));
    }
}