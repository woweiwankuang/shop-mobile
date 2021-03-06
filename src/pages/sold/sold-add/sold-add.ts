import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { PickerService } from 'ngx-weui';

import { SoldRec } from '../../../services/common/model/sold-rec';
import { TextInputModalComponent } from '../../common/text-input-modal/text-input-modal.component';
import { NumberInputModalComponent } from '../../common/number-input-modal/number-input-modal.component';
import { CustomerListComponent } from '../../customer/customer-list/customer-list';
import { SelectListModalComponent } from '../../common/select-list/select-list';
import { PickerOption } from '../../../services/common/model/picker-option/picker-option';
import { Customer } from '../../../services/common/model/customer';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { SoldInterface } from '../../../services/common/sold/sold.interface';

/**
 * Generated class for the SoldAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'sold-add',
  segment: 'sold-add'
})
@Component({
  selector: 'page-sold-add',
  templateUrl: 'sold-add.html',
})
export class SoldAddPage implements OnInit {

  soldRec: SoldRec = new SoldRec();
  pickerOption: PickerOption;
  selectedCustomer: Customer;
  loading: any;
  soldRecId: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private modalController: ModalController,
    private pickerService: PickerService,private toast: SkyToastService, private loadingController: LoadingController,
    private soldInterface: SoldInterface) {
  }

  ngOnInit() {
    this.soldRecId = this.navParams.get('soldRecId');
    if(this.soldRecId){
      this.loading = this.loadingController.create({
        content: '查询中...'
      });
      this.loading.present();
      this.soldInterface.querySoldRecById(this.soldRecId).subscribe(
        (soldRecDTO) => {
          this.loading.dismiss();
          this.soldRec = soldRecDTO.soldRec;
          this.selectedCustomer = soldRecDTO.customer;
        },
        () => {
          this.loading.dismiss();
          this.toast.show('获取销售信息失败');
        }
      );
    }
  }

  /**
   * 文本字段输入
   * @param {string} name
   */
  selectText(name: string) {
    const textInputModal = this.modalController.create(TextInputModalComponent, {
      title: name,
      textContent: this.soldRec[name]
    });
    textInputModal.onDidDismiss(data => {
      if (data) {
        this.soldRec[name] = data;
      }
    });
    textInputModal.present();

  }


  /**
   * 设置数字
   * @param {string} name
   */
  inputNumber(name: string) {
    const numberInputModal = this.modalController.create(NumberInputModalComponent, {
      number: this.soldRec[name]
    }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    numberInputModal.onDidDismiss(data => {
      if (data || data === 0) {
        this.soldRec[name] = data;
      }
    }
    );
    numberInputModal.present();
  }


  /**
   * 卖出时间字段选择
   */
  selectTime() {
    this.pickerService.showDateTime('date', null, null, null, null, this.pickerOption)
      .subscribe(
        date => {
          this.soldRec.soldTime = date.value.getTime();
        }
      );
  }

  /** 
   * 选择顾客
  */
  selectCustomer() {
    const customerSelectModal = this.modalController.create(CustomerListComponent, {

    }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    customerSelectModal.onDidDismiss(data => {
      if (data) {
        this.soldRec.customerId = data.id;
        this.selectedCustomer = data;
      }
    }
    );
    customerSelectModal.present();
  }

  /**
   * 选择地址
   */
  selectAddress(){
    
    if(!this.selectedCustomer){
      this.toast.show('请先选择顾客');
      return;
    }

    const addressSelectModal = this.modalController.create(SelectListModalComponent, {
      items: this.selectedCustomer.addresss,
      title: '选择地址'
    }, {
      showBackdrop: true,
      enableBackdropDismiss: true
    });
    addressSelectModal.onDidDismiss(data => {
      if (data) {
        this.soldRec.address = data;
      }
    });
    addressSelectModal.present();
  }

  /**
   * 保存
   */
  save(){
    this.soldRec.profit = this.soldRec.price - this.soldRec.cost - this.soldRec.postage;
    this.loading = this.loadingController.create({
      content: '保存中...'
    });
    this.loading.present();
    if(!this.soldRecId){
      this.soldInterface.addSoldRec(this.soldRec).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('保存成功');
          this.navCtrl.setRoot('sold');
        },
        () => {
          this.loading.dismiss();
          this.toast.show('保存失败');
        }
      );
    }else{
      this.soldInterface.updateSoldRec(this.soldRec).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('更新成功');
          this.navCtrl.setRoot('sold-search');
        },
        (data) => { 
          this.loading.dismiss();
          this.toast.show('更新失败');
        }
      );
    }
  }

}
