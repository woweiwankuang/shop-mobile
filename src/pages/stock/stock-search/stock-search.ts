import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Stock } from '../../../services/common/model/stock';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { StockInterface } from '../../../services/common/stock/stock.interface';

/**
 * Generated class for the StockSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'stock-search',
  segment: 'stock-search'
})
@Component({
  selector: 'page-stock-search',
  templateUrl: 'stock-search.html',
})
export class StockSearchPage implements OnInit {

  stocks: Stock[];
  loading: any;
  keyword: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private stockInterface: StockInterface,
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
    this.stockInterface.queryStocksByName(this.keyword).subscribe(
      (resp) => {
        this.loading.dismiss();
        this.stocks = resp;
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

  editStock(stock) {
    this.navCtrl.push('stock-add', {
      stockId: stock.id
    });
  }

}
