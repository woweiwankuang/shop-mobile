import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { SoldInterface } from '../../../services/common/sold/sold.interface';
import { SkyToastService } from '../../../services/common/toast/toast.service';
import { SoldRecDTO } from './sold-rec-dto';

/**
 * Generated class for the SoldSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'sold-search',
  segment: 'sold-search'
})
@Component({
  selector: 'page-sold-search',
  templateUrl: 'sold-search.html',
})
export class SoldSearchPage implements OnInit {

  soldRecDTOs: SoldRecDTO[];
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private soldInterface: SoldInterface,
    private toast: SkyToastService, private loadingController: LoadingController) {
  }


  ngOnInit() {
    this.search();
  }

  search() {
    this.loading = this.loadingController.create({
      content: '查询中...'
    });
    this.loading.present();
    this.soldInterface.queryAllSoldRecByCustomer([]).subscribe(
      (resp) => {
        this.loading.dismiss();
        this.soldRecDTOs = resp;
      },
      () => {
        this.loading.dismiss();
        this.toast.show('查询失败');
      }
    );
  }

  editSoldRec(soldRecDTO){
    this.navCtrl.push('sold-add',{
      soldRecId:soldRecDTO.soldRec.id
    });
  }

}
