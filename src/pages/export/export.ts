import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'export',
  segment: 'export'
})
@Component({
  selector: 'page-export',
  templateUrl: 'export.html',
})
export class ExportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  go2SoldRecExport(){
    this.navCtrl.push('sold-rec-export');
  }
  
  go2StockExport(){
    this.navCtrl.push('stock-export');
  }

}
