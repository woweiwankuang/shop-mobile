import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((err: HttpErrorResponse) => {
        if (err.status >= 200 && err.status < 300) {
          return Observable.of(new HttpResponse());
        }
        if(err.status == 401){
          location.href = location.origin + '/#/login';
          // err. = '登录信息过期，请重新登录';
          return Observable.of(new HttpResponse());
        }
        return Observable.throw(err);
      });
  }
}
