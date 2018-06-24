import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PickerService } from 'ngx-weui';

import { PickerOption } from '../../../services/common/model/picker-option/picker-option';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { SoldInterface } from '../../../services/common/sold/sold.interface';
import { SkySheetService } from '../../../services/common/sheet/sheet.service';
import { SheetModel } from '../../../services/common/model/common/sheet-model';
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
    private loadingController: LoadingController, private toast: SkyToastService, private soldInterface: SoldInterface,
    private datePipe: DatePipe, private sheetService: SkySheetService) {
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
        if (soldRecDTOs.length === 0) {
          this.toast.show("没有可导出的数据");
          return;
        }
        let header = [{
          filedName: 'productName',
          name: '产品名称'
        }, {
          filedName: 'num',
          name: '产品数量'
        }, {
          filedName: 'cost',
          name: '总成本'
        }, {
          filedName: 'price',
          name: '总售价'
        }, {
          filedName: 'postage',
          name: '邮费'
        }, {
          filedName: 'soldTime',
          name: '卖出时间'
        }, {
          filedName: 'customerName',
          name: '顾客'
        }, {
          filedName: 'address',
          name: '地址'
        }];

        let data = [];

        soldRecDTOs.forEach(soldRecDTO => {
          data.push({
            productName: soldRecDTO.soldRec.productName,
            num: soldRecDTO.soldRec.num.toString(),
            cost: soldRecDTO.soldRec.cost.toString(),
            price: soldRecDTO.soldRec.price.toString(),
            postage: soldRecDTO.soldRec.postage.toString(),
            soldTime: this.datePipe.transform(soldRecDTO.soldRec.soldTime, 'yyyy-MM-dd'),
            customerName: soldRecDTO.customer.realName,
            address: soldRecDTO.soldRec.address
          });
        });

        let excelModel = new SheetModel('销售记录');
        excelModel.setSheet(header, data);
        this.sheetService.exportExcel(excelModel, 'xlsx',
          this.datePipe.transform(this.startTime.getTime(), 'yyyy-MM-dd') + '至' + this.datePipe.transform(this.endTime.getTime(), 'yyyy-MM-dd') + '销售记录');
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

}
