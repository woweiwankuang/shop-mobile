import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CustomerPage } from './customer';
import { CustomerAddPageModule } from './customer-add/customer-add.module';
import { CustomerSearchPageModule } from './customer-search/customer-search.module';

@NgModule({
  declarations: [
    CustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerPage),
    CustomerAddPageModule,
    CustomerSearchPageModule
  ],
  exports: [CustomerPage]
})
export class CustomerPageModule {}
