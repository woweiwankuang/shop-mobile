import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';
import { Stock } from '../model/stock';
import { StockDTO } from '../../../pages/stock/stock-add/stock-dto';

@Injectable()
export class StockInterface {
  constructor(private http: HttpClient) {
  }

  /**
   * 新增库存
   * @param stock 库存
   */
  addStock(stock: Stock) {
    return this.http.post(ServerUrl.SERVER_URL + '/stocks', stock);
  }

  /**
   * 更新库存信息
   */
  updateStock(stock: Stock) {
    return this.http.put(ServerUrl.SERVER_URL + '/stocks/' + stock.id, stock);
  }

  /**
   * 查询单个库存
   */
  queryStockById(id: number) {
    return this.http.get(ServerUrl.SERVER_URL + '/stocks/' + id)
      .map(resp => JsonUtil.jsonConvert(resp, StockDTO));
  }

  /**
   * 根据名称模糊搜索
   */
  queryStocksByName(name: string) {
    const params = new HttpParams().set('name', name).set('type', 'name');
    return this.http.get(ServerUrl.SERVER_URL + '/stocks', { params: params })
      .map((resp: Stock[]) => {
        return resp.map(item => JsonUtil.jsonConvert(item, Stock));
      });
  }

  /**
   * 根据时间搜索
   */
  queryStocksByTime(startTime: number, endTime: number) {
    const params = new HttpParams().set('startTime', startTime.toString()).set('endTime', endTime.toString()).set('type', 'time');
    return this.http.get(ServerUrl.SERVER_URL + '/stocks', { params: params })
      .map((resp: StockDTO[]) => {
        return resp.map(item => JsonUtil.jsonConvert(item, StockDTO));
      });
  }

}