import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';
import { Stock } from '../model/stock';

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
      .map(resp => JsonUtil.jsonConvert(resp, Stock));
  }

}