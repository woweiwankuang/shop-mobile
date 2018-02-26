import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'customer',
  segment: 'customer'
})
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  add(){
    this.navCtrl.push('customer-add');
  }

  search(){
    this.navCtrl.push('customer-search');
  }

}
