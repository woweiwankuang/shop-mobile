import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SoldPage } from './sold';
import { SoldAddPageModule } from './sold-add/sold-add.module';
import { SoldSearchPageModule } from './sold-search/sold-search.module';

@NgModule({
  declarations: [
    SoldPage,
  ],
  imports: [
    IonicPageModule.forChild(SoldPage),
    SoldAddPageModule,
    SoldSearchPageModule
  ],
  exports: [SoldPage]
})
export class SoldPageModule {}
