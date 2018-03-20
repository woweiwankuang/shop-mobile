import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { StatisticsPage } from './statistics';
import { SoldStatisticsPageModule } from './sold-statistics/sold-statistics.module';

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticsPage),
    SoldStatisticsPageModule
  ],
  exports: [StatisticsPage]
})
export class StatisticsPageModule {}
