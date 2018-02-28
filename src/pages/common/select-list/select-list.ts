import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { SkyToastService } from '../../../services/common/toast/toast.service';

@Component({
    templateUrl: './select-list.html'
})
export class SelectListModalComponent implements OnInit {

    itemList: any;

    constructor(private params: NavParams,
        private toast: SkyToastService,
        private viewController: ViewController) {
    }


    ngOnInit() {
        this.itemList = this.params.get('items');
    }


    selectItem(item) {
        if (this.viewController) {
            this.viewController.dismiss(item);
            this.viewController = null;
        }
    }
}