import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';

import { AuthService } from '../../services/common/auth/auth.service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private event: Events,
    private toast: ToastController ) {
  }

  ngOnInit() {
    if (this.authService.authenticate()) {
      this.navCtrl.push('tabs');
    }

    this.event.subscribe('user:logout', () => {
      this.navCtrl.setRoot('login');
    });
  }

  login() {
    if (!this.username) {
      let toast = this.toast.create({
        message: '用户名不能为空',
        position: 'top',
        closeButtonText: '关闭',
        showCloseButton: true,
        duration: 2000
      });
      toast.present();
      return;
    }

    if (!this.password) {
      let toast = this.toast.create({
        message: '密码不能为空',
        position: 'top',
        closeButtonText: '关闭',
        showCloseButton: true,
        duration: 2000
      });
      toast.present();
      return;
    }
    this.authService.login(this.username, this.password)
      .retry(1)
      .subscribe(token => {
        this.authService.authenticate(token);

        this.navCtrl.push('tabs');
      },
        error => {
          let toast = this.toast.create({
            message: '用户名或密码错误',
            position: 'top',
            closeButtonText: '关闭',
            showCloseButton: true,
            duration: 2000
          });
          toast.present();
        });
  }

  register() {
    this.navCtrl.push('register');
  }

  search() {
    this.navCtrl.push('search');
  }

}
