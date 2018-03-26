import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';
import { SoldRecStatistics } from '../model/sold-rec-statistics';

@Injectable()
export class StatisticsInterface {
    constructor(private http: HttpClient) {
    }

    /**
     * 查询销售记录统计信息
     */
    querySoldRecStatistics(startTime: number, endTime: number) {
        const params = new HttpParams().set('startTime', startTime.toString()).set('endTime', endTime.toString());
        return this.http.get(ServerUrl.SERVER_URL + '/soldRecs/statistics', { params: params })
            .map(resp => JsonUtil.jsonConvert(resp, SoldRecStatistics));
    }
}