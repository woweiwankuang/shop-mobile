import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService: AuthService;

  constructor(private injector: Injector) {
    setTimeout(() => {
      this.authService = this.injector.get(AuthService);
    }, 500);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.authService){
      this.authService = this.injector.get(AuthService);
    }
    if (this.authService.authenticate() && req.url.indexOf('auth/oauth/token') < 0) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken().access_token
        }
      });
      return next.handle(authReq);
    }
    else {
      return next.handle(req);
    }
  }
}
