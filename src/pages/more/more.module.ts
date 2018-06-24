import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MorePage } from './more';
import { StatisticsPageModule } from '../statistics/statistics.module';
import { ExportPageModule } from '../export/export.module';
@NgModule({
  declarations: [
    MorePage,
  ],
  imports: [
    IonicPageModule.forChild(MorePage),
    StatisticsPageModule,
    ExportPageModule
  ],
  exports: [MorePage]
})
export class MorePageModule {}
