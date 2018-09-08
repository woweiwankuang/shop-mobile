import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindCodePage } from './bind-code';

@NgModule({
  declarations: [
    BindCodePage,
  ],
  imports: [
    IonicPageModule.forChild(BindCodePage),
  ],
  exports: [
    BindCodePage
  ]
})
export class BindCodePageModule {}
