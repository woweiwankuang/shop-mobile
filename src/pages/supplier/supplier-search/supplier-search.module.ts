import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierSearchPage } from './supplier-search';

@NgModule({
  declarations: [
    SupplierSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierSearchPage),
  ],
  exports: [
    SupplierSearchPage
  ]
})
export class SupplierSearchPageModule {}
