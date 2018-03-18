import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { Customer } from '../../../services/common/model/customer';
import { TextInputModalComponent } from '../../common/text-input-modal/text-input-modal.component';
import { CustomerInterface } from '../../../services/common/customer/customer.interface';
import { SkyToastService } from '../../../services/common/toast/toast.service';

/**
 * Generated class for the CustomerAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'customer-add',
  segment: 'customer-add'
})
@Component({
  selector: 'page-customer-add',
  templateUrl: 'customer-add.html',
})
export class CustomerAddPage implements OnInit{

  customer: Customer = new Customer();
  loading: any;
  customerId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalController: ModalController,
    private customerInterface: CustomerInterface, private toast: SkyToastService, private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.customerId = this.navParams.get('customerId');
    if(this.customerId){
      this.loading = this.loadingController.create({
        content: '查询中...'
      });
      this.loading.present();
      this.customerInterface.queryCustomerById(this.customerId).subscribe(
        (data) => {
          this.loading.dismiss();
          this.customer = data;
        },
        () => {
          this.loading.dismiss();
          this.toast.show('获取顾客信息失败');
        }
      );
    }
  }

  /**
   * 文本字段输入
   * @param {string} name
   */
  selectText(name: string) {
    let titleName: string;
    let content: string;
    let isAddress: boolean = false;
    if (name === 'realName') {
      titleName = '姓名';
      content = this.customer[name];
    } else if (name === 'phoneNum') {
      titleName = '手机号';
      content = this.customer[name];
    } else {
      isAddress = true;
      titleName = '常用地址' + (name + 1);
      content = this.customer.addresss[name];
    }
    const textInputModal = this.modalController.create(TextInputModalComponent, {
      title: titleName,
      textContent: content
    });
    textInputModal.onDidDismiss(data => {
      if (data) {
        if (!isAddress) {
          this.customer[name] = data;
        } else {
          this.customer.addresss[name] = data;
        }
      }
    });
    textInputModal.present();

  }

  save() {
    while(!this.customer.addresss[this.customer.addresss.length-1]){
      this.customer.addresss.pop();
    }
    this.loading = this.loadingController.create({
      content: '保存中...'
    });
    this.loading.present();
    if(!this.customerId){
      this.customerInterface.addCustomer(this.customer).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('保存成功');
          this.navCtrl.setRoot('customer');
        },
        () => {
          this.loading.dismiss();
          this.toast.show('保存失败');
        }
      );
    }else{
      this.customerInterface.updateCustomer(this.customer).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('更新成功');
          this.navCtrl.setRoot('customer-search');
        },
        (data) => {
          console.log(data);     
          this.loading.dismiss();
          this.toast.show('更新失败');
        }
      );
    }
    
  }

  addAddress(){
    this.customer.addresss.push('');
  }

}
