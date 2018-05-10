import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports

import { SkyToastService } from '../toast/toast.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  authService: AuthService;

  constructor(private injector: Injector, private toast: SkyToastService) {
    setTimeout(() => {
      this.authService = this.injector.get(AuthService);
    }, 500);
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((err: HttpErrorResponse) => {
        if (err.status >= 200 && err.status < 300) {
          return Observable.of(new HttpResponse());
        }
        if (err.status === 401) {
          if (this.authService.authenticate() && request.url.indexOf('auth/oauth/token') < 0) {
            const authReq = request.clone({
              setHeaders: {
                Authorization: 'Bearer ' + this.authService.getToken().access_token
              }
            });
            return next.handle(authReq);
          }
          else {
            location.href = location.origin + '/#/login';
            this.toast.show('登录信息过期，请重新登录',4000);
            return Observable.of(new HttpResponse());
          }
        }

        return Observable.throw(err);
      });
  }
}
