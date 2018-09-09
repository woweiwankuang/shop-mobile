import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { BindCodeInterface } from '../../services/common/bind-code/bind-code.interface';
import { SkyToastService } from '../../services/common/toast/toast.service';

/**
 * Generated class for the BindCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'bind-code',
  segment: 'bind-code'
})
@Component({
  selector: 'page-bind-code',
  templateUrl: 'bind-code.html',
})
export class BindCodePage implements OnInit {

  bindCode: string = null;//绑定码
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private bindCodeInterface: BindCodeInterface,
    private loadingController: LoadingController,
    private toast: SkyToastService) {
  }

  ngOnInit() {
    this.loading = this.loadingController.create({
      content: '查询中...'
    });
    this.loading.present();
    this.bindCodeInterface.getMyBindCode().subscribe(
      (resp) => {
        this.loading.dismiss();
        if (resp != null) {
          this.bindCode = String(resp);
        }
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

  generate() {
    this.loading = this.loadingController.create({
      content: '生成中...'
    });
    this.loading.present();
    this.bindCodeInterface.generateBindCode().subscribe(
      (resp) => {
        this.loading.dismiss();
        if (resp != null) {
          this.bindCode = String(resp);
        }
      },
      () => {
        this.loading.dismiss();
        this.toast.show('生成失败');
      }
    );
  }

}
