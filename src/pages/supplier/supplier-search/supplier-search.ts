import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Supplier } from '../../../services/common/model/supplier';
import { SupplierInterface } from '../../../services/common/supplier/supplier.interface';
import { SkyToastService } from '../../../services/common/toast/toast.service';

/**
 * Generated class for the SupplierSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'supplier-search',
  segment: 'supplier-search'
})
@Component({
  selector: 'page-supplier-search',
  templateUrl: 'supplier-search.html',
})
export class SupplierSearchPage {

  suppliers: Supplier[];
  loading: any;
  keyword: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private supplierInterface: SupplierInterface,
    private toast: SkyToastService, private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.search();
  }

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

  editSupplier(supplier) {
    this.navCtrl.push('supplier-add', {
      supplierId: supplier.id
    });
  }

}
