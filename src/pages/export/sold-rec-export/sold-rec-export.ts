import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PickerService } from 'ngx-weui';

import { PickerOption } from '../../../services/common/model/picker-option/picker-option';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { SoldInterface } from '../../../services/common/sold/sold.interface';
/**
 * Generated class for the SoldRecExportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'sold-rec-export',
  segment: 'sold-rec-export'
})
@Component({
  selector: 'page-sold-rec-export',
  templateUrl: 'sold-rec-export.html',
})
export class SoldRecExportPage {

  startTime = new Date();//选择的开始时间
  endTime = new Date();//选择的结束时间
  pickerOption: PickerOption;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pickerService: PickerService,
    private loadingController: LoadingController, private toast: SkyToastService, private soldInterface: SoldInterface) {
  }

  /**
   * 开始时间选择
   */
  selectStartTime() {
    this.pickerService.showDateTime('date', null, null, null, null, this.pickerOption)
      .subscribe(
        date => {
          this.startTime = date.value;
        }
      );
  }

  /**
   * 结束时间选择
   */
  selectEndTime() {
    this.pickerService.showDateTime('date', null, null, null, null, this.pickerOption)
      .subscribe(
        date => {
          this.endTime = date.value;
        }
      );
  }

  /**
   * 导出excel
   */
  export() {
    this.loading = this.loadingController.create({
      content: '导出中...'
    });
    this.loading.present();
    this.soldInterface.queryAllSoldRecByTime(this.startTime.getTime(), this.endTime.getTime()).subscribe(
      (resp) => {
        this.loading.dismiss();
        let soldRecDTOs = resp;
        if(soldRecDTOs.length === 0){
          this.toast.show("没有可导出的数据");
          return;
        }
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

}
