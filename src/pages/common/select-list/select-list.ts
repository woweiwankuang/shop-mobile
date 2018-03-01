import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { SkyToastService } from '../../../services/common/toast/toast.service';

@Component({
    templateUrl: './select-list.html'
})
export class SelectListModalComponent implements OnInit {

    itemList: any;//列表
    attrName: string;//属性名
    title: string;

    constructor(private params: NavParams,
        private toast: SkyToastService,
        private viewController: ViewController,
        private render: Renderer2) {
    }


    ngOnInit() {
        this.itemList = this.params.get('items');
        this.attrName = this.params.get('attrName');
        this.title = this.params.get('title');
        this.render.addClass(this.viewController.pageRef().nativeElement, 'item-list-modal');
    }


    selectItem(item) {
        if (this.viewController) {
            this.viewController.dismiss(item);
            this.viewController = null;
        }
    }
}