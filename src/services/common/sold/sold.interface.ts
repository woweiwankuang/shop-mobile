import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { SoldRec } from '../model/sold-rec';
import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';
import { SoldRecDTO } from '../../../pages/sold/sold-search/sold-rec-dto';
import { TrackingNumberDTO } from '../../../pages/search/tracking-number-dto';

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
    const params = new HttpParams().set('customerIds', customerIdStringIds.toString()).set('type', 'customer');
    return this.http.get(ServerUrl.SERVER_URL + '/soldRecs', { params: params})
      .map((resp: SoldRecDTO[]) => {
        return resp.map(item => JsonUtil.jsonConvert(item, SoldRecDTO));
      });
  }

  /**
   * 通过时间查询所有销售记录
   */
  queryAllSoldRecByTime(startTime: number, endTime: number) {
    const params = new HttpParams().set('startTime', startTime.toString()).set('endTime', endTime.toString()).set('type', 'time');
    return this.http.get(ServerUrl.SERVER_URL + '/soldRecs', { params: params })
      .map((resp: SoldRecDTO[]) => {
        return resp.map(item => JsonUtil.jsonConvert(item, SoldRecDTO));
      });
  }

  /**
   * 查询单个销售记录
   */
  querySoldRecById(id: number) {
    return this.http.get(ServerUrl.SERVER_URL + '/soldRecs/' + id)
      .map(resp => JsonUtil.jsonConvert(resp, SoldRecDTO));
  }

  /**
   * 查询单号记录
   */
  queryTrackingNumber(bindCode: string, phoneNum: string) {
    const params = new HttpParams()
    .set('bindCode', bindCode)
    .set('phoneNum', phoneNum)
    .set('type', 'bindCode')
    .set('page', '0')
    .set('size', '10')
    .set('sort', 'soldTime,desc');
    return this.http.get<any>(ServerUrl.SERVER_URL + '/trackingNumbers', {params: params})
    .map(data => data.content ? data.content : [])
    .map((resp: TrackingNumberDTO[]) => {
      return resp.map(item => JsonUtil.jsonConvert(item, TrackingNumberDTO));
    });
  }

  /**
   * 获取快递物流
   */
  searchTrackingNumber(trackingNumber:string) {
    const params = new HttpParams().set('trackingNumber', trackingNumber);
    return this.http.post(ServerUrl.SERVER_URL + '/expressSearchs', null, {
      params: params,
      responseType: 'text'
    });
  }
}