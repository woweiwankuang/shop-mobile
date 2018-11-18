import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockAddPage } from './stock-add';
import { CommonCompoentModule } from '../../common/common-component.module';

@NgModule({
  declarations: [
    StockAddPage,
  ],
  imports: [
    IonicPageModule.forChild(StockAddPage),
    CommonCompoentModule
  ],
  exports: [
    StockAddPage
  ]
})
export class StockAddPageModule {}
