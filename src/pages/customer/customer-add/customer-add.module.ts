import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CustomerAddPage } from './customer-add';
import { CommonCompoentModule } from '../../common/common-component.module';

@NgModule({
  declarations: [
    CustomerAddPage
  ],
  entryComponents:[
    CustomerAddPage
  ],
  imports: [
    IonicPageModule.forChild(CustomerAddPage),
    CommonCompoentModule
  ],
  exports: [CustomerAddPage]
})
export class CustomerAddPageModule {}
