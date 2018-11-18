import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PickerService } from 'ngx-weui';

import { PickerOption } from '../../../services/common/model/picker-option/picker-option';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { SkySheetService } from '../../../services/common/sheet/sheet.service';
import { SheetModel } from '../../../services/common/model/common/sheet-model';
import { StockInterface } from '../../../services/common/stock/stock.interface';

/**
 * Generated class for the StockExportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'stock-export',
  segment: 'stock-export'
})
@Component({
  selector: 'page-stock-export',
  templateUrl: 'stock-export.html',
})
export class StockExportPage {

  startTime = new Date();//选择的开始时间
  endTime = new Date();//选择的结束时间
  pickerOption: PickerOption;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pickerService: PickerService,
    private loadingController: LoadingController, private toast: SkyToastService, private stockInterface: StockInterface,
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
    this.stockInterface.queryStocksByTime(this.startTime.getTime(), this.endTime.getTime()).subscribe(
      (resp) => {
        this.loading.dismiss();
        let stocks = resp;
        if (stocks.length === 0) {
          this.toast.show("没有可导出的数据");
          return;
        }
        let header = [{
          filedName: 'name',
          name: '名称'
        }, {
          filedName: 'num',
          name: '数量'
        }, {
          filedName: 'price',
          name: '总价'
        }, {
          filedName: 'specification',
          name: '规格'
        }, {
          filedName: 'supplierName',
          name: '供应商名称'
        }, {
          filedName: 'supplierPhoneNum',
          name: '供应商电话'
        }, {
          filedName: 'createTime',
          name: '记录时间'
        }];

        let data = [];

        stocks.forEach(stockDto => {
          data.push({
            name: stockDto.stock.name,
            num: stockDto.stock.num.toString(),
            price: stockDto.stock.price.toString(),
            specification: stockDto.stock.specification ? stockDto.stock.specification : '',
            supplierName: stockDto.supplier ? stockDto.supplier.name : '',
            supplierPhoneNum: stockDto.supplier ? stockDto.supplier.phoneNum : '',
            createTime: this.datePipe.transform(stockDto.stock.createTime, 'yyyy-MM-dd HH:mm')
          });
        });

        let excelModel = new SheetModel('库存记录');
        excelModel.setSheet(header, data);
        this.sheetService.exportExcel(excelModel, 'xlsx',
          this.datePipe.transform(this.startTime.getTime(), 'yyyy-MM-dd') + '至' + this.datePipe.transform(this.endTime.getTime(), 'yyyy-MM-dd') + '库存记录');
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

}
