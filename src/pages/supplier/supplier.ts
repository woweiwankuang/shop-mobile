import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'supplier',
  segment: 'supplier'
})
@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
})
export class SupplierPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  add(){
    this.navCtrl.push('supplier-add');
  }

  search(){
    this.navCtrl.push('supplier-search');
  }

}
