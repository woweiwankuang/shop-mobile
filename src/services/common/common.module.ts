import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { CustomerInterface } from './customer/customer.interface';
import { SkyToastService } from './toast/toast.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CustomerInterface,
    SkyToastService
  ]
})
export class SkyCommonModule {

}