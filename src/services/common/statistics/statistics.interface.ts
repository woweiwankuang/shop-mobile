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
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    querySoldRecStatistics(startTime: number, endTime: number) {
        const params = new HttpParams().set('startTime', startTime.toString()).set('endTime', endTime.toString());
        return this.http.post(ServerUrl.SERVER_URL + '/soldRecs/statistics', null, { params: params })
            .map(resp => JsonUtil.jsonConvert(resp, SoldRecStatistics));
    }
}