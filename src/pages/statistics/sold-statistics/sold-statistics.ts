import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PickerService } from 'ngx-weui';

import { PickerOption } from '../../../services/common/model/picker-option/picker-option';
import { DateUtil } from '../../../services/common/util/date-util';
import { StatisticsInterface } from '../../../services/common/statistics/statistics.interface';
import { SoldRecStatistics } from '../../../services/common/model/sold-rec-statistics';
import { SkyToastService } from '../../../services/common/toast/toast.service';

/**
 * Generated class for the SoldStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'sold-statistics',
  segment: 'sold-statistics'
})
@Component({
  selector: 'page-sold-statistics',
  templateUrl: 'sold-statistics.html',
})
export class SoldStatisticsPage implements OnInit {

  startTime = new Date();//选择的开始时间
  endTime = new Date();//选择的结束时间
  pickerOption: PickerOption;
  loading: any;
  soldRecStatistics: SoldRecStatistics;//销售统计信息

  constructor(public navCtrl: NavController, public navParams: NavParams, private pickerService: PickerService,
    private loadingController: LoadingController, private statisticsInterface: StatisticsInterface, private toast: SkyToastService) {
  }

  ngOnInit() {
    this.startTime = DateUtil.getNewYear(this.startTime);
    this.endTime = DateUtil.getEndDay(this.endTime);
  }

  /**
   * 开始时间选择
   */
  selectStartTime() {
    this.pickerService.showDateTime('date', null, null, null, null, this.pickerOption)
      .subscribe(
      date => {
        this.startTime = date.value.getTime();
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
        this.endTime = date.value.getTime();
      }
      );
  }

  /**
   * 查询统计信息
   */
  getSoldRecStatistics() {
    this.loading = this.loadingController.create({
      content: '查询中...'
    });
    this.loading.present();
    this.statisticsInterface.querySoldRecStatistics(this.startTime.getTime(), this.endTime.getTime()).subscribe(
      (resp) => {
        this.loading.dismiss();
        this.soldRecStatistics = resp;
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

}
