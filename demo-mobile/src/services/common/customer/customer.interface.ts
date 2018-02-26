import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Customer } from '../model/customer';
import { ServerUrl } from '../../../global';
import { JsonUtil } from '../util/json-util';

@Injectable()
export class CustomerInterface {
    constructor(private http: HttpClient) {
    }

    /**
     * 新增顾客
     * @param customer 顾客
     */
    addCustomer(customer: Customer) {
        return this.http.post(ServerUrl.SERVER_URL + '/customers', customer);
    }

    /**
     * 查询顾客
     * @param keyword 姓名模糊查询
     */
    queryCustomer(keyword: string) {
        const params = new HttpParams().set('realName', keyword.toString());
        return this.http.get(ServerUrl.SERVER_URL + '/customers', { params: params })
            .map((resp: Customer[]) => {
                return resp.map(item => JsonUtil.jsonConvert(item, Customer));
            });
    }

    /**
     * 查询单个顾客
     * @param id 顾客id
     */
    queryCustomerById(id: number) {
        return this.http.get(ServerUrl.SERVER_URL + '/customers/' + id)
            .map(resp => JsonUtil.jsonConvert(resp, Customer));
    }

    /**
     * 更新顾客信息
     */
    updateCustomer(customer: Customer) {
        return this.http.put(ServerUrl.SERVER_URL + '/customers/' + customer.id, customer);
    }
}