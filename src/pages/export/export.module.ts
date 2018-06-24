import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ExportPage } from './export';
import { SoldRecExportPageModule } from './sold-rec-export/sold-rec-export.module';

@NgModule({
  declarations: [
    ExportPage,
  ],
  imports: [
    IonicPageModule.forChild(ExportPage),
    SoldRecExportPageModule
  ],
  exports: [
    ExportPage
  ]
})
export class ExportPageModule {}
