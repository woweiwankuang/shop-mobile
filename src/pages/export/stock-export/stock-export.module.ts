import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockExportPage } from './stock-export';

@NgModule({
  declarations: [
    StockExportPage,
  ],
  imports: [
    IonicPageModule.forChild(StockExportPage),
  ],
  exports: [
    StockExportPage
  ]
})
export class StockExportPageModule {}
