import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class SkyToastService {

  constructor(private toastCtrl: ToastController) {
  }

  show(message?: string, duration?: number, position?: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration || 2000,
      position: position || 'top'
    });
    toast.present();
  }
}