import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { Supplier } from '../../../services/common/model/supplier';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { SupplierInterface } from '../../../services/common/supplier/supplier.interface';
import { TextInputModalComponent } from '../../common/text-input-modal/text-input-modal.component';

/**
 * Generated class for the SupplierAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'supplier-add',
  segment: 'supplier-add'
})
@Component({
  selector: 'page-supplier-add',
  templateUrl: 'supplier-add.html',
})
export class SupplierAddPage implements OnInit {

  supplier: Supplier = new Supplier();
  loading: any;
  supplierId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: SkyToastService,
     private loadingController: LoadingController, private supplierInterface: SupplierInterface, private modalController: ModalController) {
  }

  ngOnInit() {
    this.supplierId = this.navParams.get('supplierId');
    if(this.supplierId){
      this.loading = this.loadingController.create({
        content: '查询中...'
      });
      this.loading.present();
      this.supplierInterface.querySupplierById(this.supplierId).subscribe(
        (supplier) => {
          this.loading.dismiss();
          this.supplier = supplier;
        },
        () => {
          this.loading.dismiss();
          this.toast.show('获取库存信息失败');
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
      textContent: this.supplier[name]
    });
    textInputModal.onDidDismiss(data => {
      if (data) {
        this.supplier[name] = data;
      }
    });
    textInputModal.present();
  }

  /**
   * 保存
   */
  save(){
    this.loading = this.loadingController.create({
      content: '保存中...'
    });
    this.loading.present();
    if(!this.supplierId){
      this.supplierInterface.addSupplier(this.supplier).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('保存成功');
          this.navCtrl.push('supplier');
        },
        () => {
          this.loading.dismiss();
          this.toast.show('保存失败');
        }
      );
    }else{
      this.supplierInterface.updateSupplier(this.supplier).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('更新成功');
          this.navCtrl.push('supplier-search');
        },
        (data) => {  
          this.loading.dismiss();
          this.toast.show('更新失败');
        }
      );
    }
  }

}
