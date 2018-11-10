import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'stock',
  segment: 'stock'
})
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  add(){
    this.navCtrl.push('stock-add');
  }

  search(){
    this.navCtrl.push('stock-search');
  }

}
