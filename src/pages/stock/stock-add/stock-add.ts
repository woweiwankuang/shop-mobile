import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { Stock } from '../../../services/common/model/stock';
import { StockInterface } from '../../../services/common/stock/stock.interface';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { TextInputModalComponent } from '../../common/text-input-modal/text-input-modal.component';
import { NumberInputModalComponent } from '../../common/number-input-modal/number-input-modal.component';

/**
 * Generated class for the StockAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'stock-add',
  segment: 'stock-add'
})
@Component({
  selector: 'page-stock-add',
  templateUrl: 'stock-add.html',
})
export class StockAddPage implements OnInit {

  stock: Stock = new Stock();
  loading: any;
  stockId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalController: ModalController,
    private stockInterface: StockInterface,private toast: SkyToastService, private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.stockId = this.navParams.get('stockId');
    if(this.stockId){
      this.loading = this.loadingController.create({
        content: '查询中...'
      });
      this.loading.present();
      this.stockInterface.queryStockById(this.stockId).subscribe(
        (stock) => {
          this.loading.dismiss();
          this.stock = stock;
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
      textContent: this.stock[name]
    });
    textInputModal.onDidDismiss(data => {
      if (data) {
        this.stock[name] = data;
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
      number: this.stock[name]
    }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    numberInputModal.onDidDismiss(data => {
      if (data || data === 0) {
        this.stock[name] = data;
      }
    }
    );
    numberInputModal.present();
  }

  /**
   * 保存
   */
  save(){
    this.loading = this.loadingController.create({
      content: '保存中...'
    });
    this.loading.present();
    if(!this.stockId){
      this.stockInterface.addStock(this.stock).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('保存成功');
          this.navCtrl.push('stock');
        },
        () => {
          this.loading.dismiss();
          this.toast.show('保存失败');
        }
      );
    }else{
      this.stockInterface.updateStock(this.stock).subscribe(
        () => {
          this.loading.dismiss();
          this.toast.show('更新成功');
          this.navCtrl.push('stock-search');
        },
        (data) => {  
          this.loading.dismiss();
          this.toast.show('更新失败');
        }
      );
    }
  }

}
