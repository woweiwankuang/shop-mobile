import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PickerService } from 'ngx-weui';

import { SoldRec } from '../../../services/common/model/soldRec';
import { TextInputModalComponent } from '../../common/text-input-modal/text-input-modal.component';
import { NumberInputModalComponent } from '../../common/number-input-modal/number-input-modal.component';
import { PickerOption } from '../../../services/common/model/picker-option/picker-option';

/**
 * Generated class for the SoldAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'sold-add',
  segment: 'sold-add'
})
@Component({
  selector: 'page-sold-add',
  templateUrl: 'sold-add.html',
})
export class SoldAddPage implements OnInit {

  soldRec: SoldRec = new SoldRec();
  pickerOption: PickerOption;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalController: ModalController,
    private pickerService: PickerService) {
  }

  ngOnInit() {
  }

  /**
   * 文本字段输入
   * @param {string} name
   */
  selectText(name: string) {
    const textInputModal = this.modalController.create(TextInputModalComponent, {
      title: name,
      textContent: this.soldRec[name]
    });
    textInputModal.onDidDismiss(data => {
      if (data) {
        this.soldRec[name] = data;
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
      number: this.soldRec[name]
    }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    numberInputModal.onDidDismiss(data => {
      if (data) {
        this.soldRec[name] = data;
      }
    }
    );
    numberInputModal.present();
  }


  /**
   * 卖出时间字段选择
   */
  selectTime() {
    this.pickerService.showDateTime('date', null, null, null, null, this.pickerOption)
      .subscribe(
        date => {
          this.soldRec.soldTime = date.value.getTime();
        }
      );
  }

  save(){
    
  }

}
