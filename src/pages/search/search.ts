import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { TextInputModalComponent } from '../common/text-input-modal/text-input-modal.component';
import { SoldInterface } from '../../services/common/sold/sold.interface';
import { TrackingNumberDTO } from './tracking-number-dto';
import { SkyToastService } from '../../services/common/toast/toast.service';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'search',
  segment: 'search'
})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  bindCode: string = null;//绑定码
  phoneNum: string = null;//手机号
  loading: any;
  trackingNumbers: TrackingNumberDTO[];//单号list

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toast: SkyToastService,
    private soldInterface: SoldInterface) {
  }

  /**
   * 文本字段输入
   * @param {string} name
   */
  selectText(name: string) {
    const textInputModal = this.modalController.create(TextInputModalComponent, {
      title: name,
      textContent: this[name]
    });
    textInputModal.onDidDismiss(data => {
      if (data) {
        this[name] = data;
      }
    });
    textInputModal.present();
  }

  /**
   * 查询单号
   */
  search() {

    if (!this.bindCode) {
      this.toast.show("请输入查询码");
      return;
    }
    if (!this.phoneNum) {
      this.toast.show('请输入手机号');
      return;
    }
    this.loading = this.loadingController.create({
      content: '查询中...'
    });
    this.loading.present();
    this.soldInterface.queryTrackingNumber(this.bindCode, this.phoneNum).subscribe(
      (resp) => {
        this.loading.dismiss();
        this.trackingNumbers = resp;
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

}
