import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SoldAddPage } from './sold-add';
import { CommonCompoentModule } from '../../common/common-component.module';

@NgModule({
  declarations: [
    SoldAddPage
  ],
  entryComponents:[
    SoldAddPage
  ],
  imports: [
    IonicPageModule.forChild(SoldAddPage),
    CommonCompoentModule
  ],
  exports: [SoldAddPage]
})
export class SoldAddPageModule {}
