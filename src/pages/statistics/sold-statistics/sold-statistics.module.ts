import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoldStatisticsPage } from './sold-statistics';

@NgModule({
  declarations: [
    SoldStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(SoldStatisticsPage),
  ],
  exports: [SoldStatisticsPage]
})
export class SoldStatisticsPageModule {}
