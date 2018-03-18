import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SoldSearchPage } from './sold-search';

@NgModule({
  declarations: [
    SoldSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SoldSearchPage),
  ],
})
export class SoldSearchPageModule {}
