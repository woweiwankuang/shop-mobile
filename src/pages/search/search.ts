import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController  } from 'ionic-angular';

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
  segment: 'search/:bindCode'
})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit {
  bindCode: string = null;//绑定码
  phoneNum: string = null;//手机号
  loading: any;
  trackingNumbers: TrackingNumberDTO[];//单号list
  hideBindCode: boolean = false;//隐藏查询码

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toast: SkyToastService,
    private alertCtrl: AlertController,
    private soldInterface: SoldInterface) {
  }

  ngOnInit() {
    let bindCode = this.navParams.get('bindCode');
    if (bindCode) {
      this.bindCode = bindCode;
      this.hideBindCode = true;
    }
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
        this.toast.show('查询失败,请确认手机号码是否正确');
      }
    );
  }

  /**
   * 查询快递物流
   * @param trackingNumber 快递号
   */
  searchTrackingNumber(trackingNumber: string) {
    this.loading = this.loadingController.create({
      content: '查询中...'
    });
    this.loading.present();
    this.soldInterface.searchTrackingNumber(trackingNumber).subscribe(
      (resp) => {
        this.loading.dismiss();
        var exp = JSON.parse(resp);
        var result = '';
        if (exp.Traces && exp.Traces.length > 0) {
          exp.Traces.forEach(trace => {
            result += '<p>' + trace.AcceptTime + ' ：' + trace.AcceptStation + '</p>';
          });
        }else {
          result = '<p>暂无物流信息</p>';
        }
        const alert = this.alertCtrl.create({
          title: '物流查询',
          cssClass:'search-alter',
          subTitle: result,
          buttons: ['OK']
        });
        alert.present();
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

}
