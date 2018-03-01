import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { CustomerInterface } from './customer/customer.interface';
import { SkyToastService } from './toast/toast.service';
import { SoldInterface } from './sold/sold.interface';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CustomerInterface,
    SkyToastService,
    SoldInterface
  ]
})
export class SkyCommonModule {

}
