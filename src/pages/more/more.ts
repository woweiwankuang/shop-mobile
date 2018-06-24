import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { AuthService } from '../../services/common/auth/auth.service';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'more',
  segment: 'more'
})
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private event: Events) {
  }

  //去统计页面
  go2Stats(){
    this.navCtrl.push('statistics');
  }

  //去导出页面
  go2Export(){
    this.navCtrl.push('export');
  }
  
  //退出登录
  logout() {
    this.authService.logout();
    this.event.publish('user:logout');
    this.navCtrl.setRoot('login');
  }

}
