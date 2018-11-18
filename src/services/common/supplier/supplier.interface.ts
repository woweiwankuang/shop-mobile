import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';
import { Supplier } from '../model/supplier';
import { SupplierPageModule } from '../../../pages/supplier/supplier.module';

@Injectable()
export class SupplierInterface {
  constructor(private http: HttpClient) {
  }

  /**
   * 新增供应商
   * @param supplier 供应商
   */
  addSupplier(supplier: Supplier) {
    return this.http.post(ServerUrl.SERVER_URL + '/suppliers', supplier);
  }

  /**
   * 查询单个供应商
   */
  querySupplierById(id: number) {
    return this.http.get(ServerUrl.SERVER_URL + '/suppliers/' + id)
      .map(resp => JsonUtil.jsonConvert(resp, Supplier));
  }

  /**
   * 更新供应商信息
   */
  updateSupplier(supplier: Supplier) {
    return this.http.put(ServerUrl.SERVER_URL + '/stocks/' + supplier.id, supplier);
  }

  /**
   * 根据名称模糊搜索
   */
  querySuppliersByName(name: string) {
    const params = new HttpParams().set('name', name);
    return this.http.get(ServerUrl.SERVER_URL + '/suppliers', { params: params })
      .map((resp: Supplier[]) => {
        return resp.map(item => JsonUtil.jsonConvert(item, Supplier));
      });
  }


}