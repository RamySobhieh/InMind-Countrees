import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('accessToken');
    if (
      req.url.includes('/Login()' || '/SignUp()' || '/CreateAdminUser()') ||
      req.url.includes('/api.unsplash.com')
    ) {
      return next.handle(req);
    } else {
      if (authToken) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });
        return next.handle(authReq);
      }
      this.router.navigate(['/auth']);
      return EMPTY;
    }
  }
}
