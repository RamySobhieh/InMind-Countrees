import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url.includes('/Login()') ||
      req.url.includes('/SignUp()') ||
      req.url.includes('/CreateAdminUser()') ||
      req.url.includes('/RefreshToken()') ||
      req.url.includes('/api.unsplash.com')
    ) {
      console.log(req.url);
      return next.handle(req);
    } else {
      const isValid: boolean = this.authService.validateAccessToken();
      if (isValid) {
        const accessToken = localStorage.getItem('accessToken');
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        });
        return next.handle(authReq);
      } else {
        const isRefresh: boolean = this.authService.validateRefreshToken();
        if (isRefresh) {
          this.authService.refresh().subscribe((data) => {
            console.log('DATA!!!', data);
          });
          return next.handle(req);
        } else {
          this.router.navigate(['/auth']);
          return EMPTY;
        }
      }
    }
  }
}
