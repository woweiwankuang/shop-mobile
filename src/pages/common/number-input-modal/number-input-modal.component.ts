import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { isUndefined } from 'ionic-angular/util/util';
import { NavParams, ViewController } from 'ionic-angular';

import { SkyToastService } from '../../../services/common/toast/toast.service';

@Component({
  templateUrl: './number-input-modal.component.html'
})
export class NumberInputModalComponent implements OnInit, AfterViewChecked {

  reg: RegExp = /^\d{1,6}(\.\d{1})?$/;

  learnCertNumber: number;

  count = 0;

  @ViewChild("focusInput") focusInput: ElementRef;

  constructor(private render: Renderer2,
              private params: NavParams,
              private toast: SkyToastService,
              private viewController: ViewController) {
  }

  ngOnInit() {
    this.learnCertNumber = this.params.get('number');
    this.render.addClass(this.viewController.pageRef().nativeElement, 'number-input-modal');
  }

  ngAfterViewChecked() {
    if(this.count < 5){
      this.focusInput.nativeElement.addEventListener('click', () => {
        document.getElementById('numberInput').focus();
      });
      this.focusInput.nativeElement.click();
      this.count++;
    }
  }

  confirm() {
    if (this.isValidate() && this.viewController) {
      this.viewController.dismiss(this.learnCertNumber);
      this.viewController = null;
    } else {
      this.toast.show('请输入1000000以下数，最多保留一位小数');
    }
  }

  cancel() {
    if (this.viewController) {
      this.viewController.dismiss();
      this.viewController = null;
    }
  }

  private isValidate(): boolean {
    if (!isUndefined(this.learnCertNumber) && (this.learnCertNumber || this.learnCertNumber === 0)) {
      return this.reg.test(this.learnCertNumber.toString()) || this.learnCertNumber === 100;
    } else {
      return false;
    }
  }

}
