import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CustomerAddPage } from './customer-add';
import { TextInputModalComponent } from '../../common/text-input-modal/text-input-modal.component';

@NgModule({
  declarations: [
    CustomerAddPage,
    TextInputModalComponent
  ],
  entryComponents:[
    CustomerAddPage,
    TextInputModalComponent
  ],
  imports: [
    IonicPageModule.forChild(CustomerAddPage),
  ],
  exports: [CustomerAddPage]
})
export class CustomerAddPageModule {}
