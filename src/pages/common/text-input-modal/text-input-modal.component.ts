import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { isUndefined } from 'ionic-angular/util/util';

import { FocusUtil } from '../../../services/common/util/focus-util';

@Component({
  templateUrl: './text-input-modal.component.html'
})
export class TextInputModalComponent implements OnInit, AfterViewInit {

  title = '';

  textContent: string;

  constructor(private params: NavParams,
              private viewController: ViewController) {
  }

  ngOnInit() {
    this.title = this.params.get('title');
    this.textContent = this.params.get('textContent');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      FocusUtil.focus('#myTextArea');
    }, 400);
  }

  save() {
    if (this.viewController) {
      if (!isUndefined(this.textContent) && this.textContent) {
        this.textContent = this.filterSpace(this.textContent);
      }
      this.viewController.dismiss(this.textContent);
      this.viewController = null;
    }
  }

  /**
   * 关闭模态框
   */
  killMyself() {
    if (this.viewController) {
      if (!isUndefined(this.textContent) && this.textContent) {
        this.textContent = this.filterSpace(this.textContent);
      }
      this.viewController.dismiss(this.textContent);
      this.viewController = null;
    }
  }

  /**
   * 过滤前后空格
   * @param text
   * @return {string}
   */
  private filterSpace(text: string) {
    return text.replace(/(^\s*)/g, '').replace(/(\s*$)/g, '');
  }
}
