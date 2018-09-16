import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRCodeModule } from 'angular2-qrcode';

import { BindCodePage } from './bind-code';

@NgModule({
  declarations: [
    BindCodePage,
  ],
  imports: [
    IonicPageModule.forChild(BindCodePage),
    QRCodeModule
  ],
  exports: [
    BindCodePage
  ]
})
export class BindCodePageModule {}
