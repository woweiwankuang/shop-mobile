import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsPage } from './tabs';
import { HomePageModule } from '../home/home.module';
import { SoldPageModule } from '../sold/sold.module';
import { CustomerPageModule } from '../customer/customer.module';
import { MorePageModule } from '../more/more.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    HomePageModule,
    SoldPageModule,
    CustomerPageModule,
    MorePageModule
  ],
  exports: [TabsPage]
})
export class TabsPageModule {}
