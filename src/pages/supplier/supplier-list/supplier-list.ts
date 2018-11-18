import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';

import { SkyToastService } from '../../../services/common/toast/toast.service';
import { Supplier } from '../../../services/common/model/supplier';
import { SupplierInterface } from '../../../services/common/supplier/supplier.interface';

@Component({
  templateUrl: './supplier-list.html'
})
export class SupplierListComponent {

  keyword: string = '';
  loading: any;
  suppliers: Supplier[];

  constructor(private viewController: ViewController, private loadingController: LoadingController,
    private supplierInterface: SupplierInterface, private toast: SkyToastService) {
  }


  /** 
   * 搜索
  */
  search() {
    this.loading = this.loadingController.create({
      content: '查询中...'
    });
    this.loading.present();
    this.supplierInterface.querySuppliersByName(this.keyword).subscribe(
      (resp) => {
        this.loading.dismiss();
        this.suppliers = resp;
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
  selectSupplier(supplier) {
    if (this.viewController) {
      this.viewController.dismiss(supplier);
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