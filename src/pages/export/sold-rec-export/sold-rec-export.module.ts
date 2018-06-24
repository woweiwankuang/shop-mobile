import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoldRecExportPage } from './sold-rec-export';

@NgModule({
  declarations: [
    SoldRecExportPage,
  ],
  imports: [
    IonicPageModule.forChild(SoldRecExportPage),
  ],
  exports: [
    SoldRecExportPage
  ]
})
export class SoldRecExportPageModule {}
