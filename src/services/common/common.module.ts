import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { CustomerInterface } from './customer/customer.interface';
import { SkyToastService } from './toast/toast.service';
import { SoldInterface } from './sold/sold.interface';
import { StatisticsInterface } from './statistics/statistics.interface';
import { UserInterface } from './user/user.interface';
import { ErrorInterceptor } from './httpInterceptor/error.interceptor';
import { AuthInterceptor } from './httpInterceptor/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { SkyLocalStorageService } from './localStorage/local-storage.service';
import { SkySheetService } from './sheet/sheet.service';
import { BindCodeInterface } from './bind-code/bind-code.interface';
import { StockInterface } from './stock/stock.interface';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    SkyLocalStorageService,
    CustomerInterface,
    SkyToastService,
    SoldInterface,
    StatisticsInterface,
    UserInterface,
    SkySheetService,
    BindCodeInterface,
    StockInterface,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ]
})
export class SkyCommonModule {

}
