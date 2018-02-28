import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';

import { CustomerInterface } from '../../../services/common/customer/customer.interface';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { Customer } from '../../../services/common/model/customer';

@Component({
    templateUrl: './customer-list.html'
  })
  export class CustomerListComponent {

    keyword: string = '';
    loading: any;
    customers:  Customer[];

    constructor(private viewController: ViewController, private loadingController: LoadingController,
        private customerInterface: CustomerInterface, private toast: SkyToastService) {
     }


     /** 
      * 搜索
     */
    search() {
        this.loading = this.loadingController.create({
          content: '查询中...'
        });
        this.customerInterface.queryCustomer(this.keyword).subscribe(
          (resp) => {
            this.loading.dismiss();
            this.customers = resp;
          },
          () => {
            this.loading.dismiss();
            this.toast.show('查询失败');
          }
        );
      }

      /**
       * 选择顾客
       * @param customer 顾客 
       */
      selectCustomer(customer){
        if (this.viewController) {
            this.viewController.dismiss(customer);
            this.viewController = null;
          }
      }

      /**
   * 关闭模态框
   */
  killMyself() {
    if (this.viewController) {
      this.viewController.dismiss(null);
      this.viewController = null;
    }
  }

  }