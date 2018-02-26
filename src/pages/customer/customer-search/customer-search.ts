import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { CustomerInterface } from '../../../services/common/customer/customer.interface';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { Customer } from '../../../services/common/model/customer';

/**
 * Generated class for the CustomerSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'customer-search',
  segment: 'customer-search'
})
@Component({
  selector: 'page-customer-search',
  templateUrl: 'customer-search.html',
})
export class CustomerSearchPage {

  keyword: string = '';
  loading: any;
  customers:  Customer[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingController: LoadingController,
     private customerInterface: CustomerInterface, private toast: SkyToastService) {
  }

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

  editCustomer(customer){
    this.navCtrl.push('customer-add',{
      customerId:customer.id
    });
  }

}
