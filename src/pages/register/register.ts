import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { UserInterface } from '../../services/common/user/user.interface';
import { CreateUser } from './create-user';
import { SkyToastService } from '../../services/common/toast/toast.service';

@IonicPage({
  name: 'register',
  segment: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createUser: CreateUser = new CreateUser();
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: SkyToastService, private loadingController: LoadingController,
    private userInterface: UserInterface) {
  }

  register() {
    this.loading = this.loadingController.create({
      content: '注册中...'
    });
    this.loading.present();
    this.userInterface.register(this.createUser).subscribe(
      () => {
        this.loading.dismiss();
        this.toast.show('注册成功');
        this.navCtrl.setRoot('login');
      },
      () => {
        this.loading.dismiss();
        this.toast.show('注册失败，请重试');
      }
    );
  }

}
