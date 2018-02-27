import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SoldPage } from './sold';
import { SoldAddPageModule } from './sold-add/sold-add.module';

@NgModule({
  declarations: [
    SoldPage,
  ],
  imports: [
    IonicPageModule.forChild(SoldPage),
    SoldAddPageModule
  ],
  exports: [SoldPage]
})
export class SoldPageModule {}
